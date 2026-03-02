import { randomUUID } from 'crypto';

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let nonce, amountCents, currency, note;
    try {
        ({ nonce, amountCents, currency = 'CAD', note } = JSON.parse(event.body));
    } catch {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
    }

    if (!nonce || !amountCents) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing nonce or amount' }) };
    }

    const token = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.VITE_SQUARE_LOCATION_ID || process.env.SQUARE_LOCATION_ID;
    if (!token || !locationId) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Square not configured' }) };
    }

    try {
        const resp = await fetch('https://connect.squareup.com/v2/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Square-Version': '2024-01-17',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                source_id: nonce,
                idempotency_key: randomUUID(),
                amount_money: { amount: amountCents, currency },
                location_id: locationId,
                note: note || 'Wich Doc online order',
            }),
        });

        const data = await resp.json();

        if (!resp.ok) {
            return {
                statusCode: resp.status,
                body: JSON.stringify({ error: data.errors?.[0]?.detail ?? 'Payment failed' }),
            };
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: data.payment.id }),
        };
    } catch (err) {
        return { statusCode: 502, body: JSON.stringify({ error: 'Failed to reach Square' }) };
    }
};
