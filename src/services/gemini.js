const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

export const callGemini = async (prompt) => {
    if (!apiKey) {
        console.warn("Gemini API Key missing. Returning mock data.");
        // Mock response for preview/no-key environments
        await new Promise(r => setTimeout(r, 1000));
        return JSON.stringify({
            dishName: "The Placebo Effect",
            diagnosis: "Acute Hunger Pangs",
            reason: "You seem hungry. This sandwich is imaginary but delicious.",
            dosage: "One large bite."
        });
    }

    const attempts = [
        { version: 'v1beta', model: 'gemini-2.0-flash' }, 
        { version: 'v1beta', model: 'gemini-1.5-flash' },
        { version: 'v1beta', model: 'gemini-pro' }
    ];

    let lastError = null;
    for (const attempt of attempts) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/${attempt.version}/models/${attempt.model}:generateContent`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                }
            );
            const data = await response.json();
            if (response.ok) return data.candidates[0].content.parts[0].text;
            lastError = new Error(`Model ${attempt.model} error: ${data.error?.message}`);
        } catch (e) {
            lastError = e;
        }
    }
    throw lastError || new Error("Connection failed across all endpoints.");
};