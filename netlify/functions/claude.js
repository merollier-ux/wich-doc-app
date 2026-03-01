export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let prompt;
    try {
        ({ prompt } = JSON.parse(event.body));
    } catch {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
    }

    if (!prompt) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing prompt' }) };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1024,
                messages: [{ role: 'user', content: prompt }]
            }),
            signal: controller.signal
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error?.message || 'Claude API error' })
            };
        }

        const text = data.content?.[0]?.text;
        if (!text) {
            return { statusCode: 500, body: JSON.stringify({ error: 'Unexpected response format' }) };
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        };
    } catch (err) {
        if (err.name === 'AbortError') {
            return { statusCode: 504, body: JSON.stringify({ error: 'Request timed out' }) };
        }
        return { statusCode: 502, body: JSON.stringify({ error: 'Failed to reach AI service' }) };
    } finally {
        clearTimeout(timeout);
    }
};
