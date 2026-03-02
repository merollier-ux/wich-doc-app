export const handler = async () => {
    const token = process.env.SQUARE_ACCESS_TOKEN;
    if (!token) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Square not configured' }) };
    }

    try {
        const resp = await fetch(
            'https://connect.squareup.com/v2/catalog/list?types=ITEM',
            {
                headers: {
                    'Square-Version': '2024-01-17',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await resp.json();

        if (!resp.ok) {
            return { statusCode: resp.status, body: JSON.stringify({ error: data.errors?.[0]?.detail ?? 'Catalog fetch failed' }) };
        }

        const items = (data.objects ?? []).map(obj => ({
            id: obj.id,
            name: obj.item_data.name,
            description: obj.item_data.description ?? '',
            variations: (obj.item_data.variations ?? []).map(v => ({
                id: v.id,
                name: v.item_variation_data.name,
                priceCents: v.item_variation_data.price_money?.amount ?? 0,
                currency: v.item_variation_data.price_money?.currency ?? 'CAD',
            })),
        }));

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(items),
        };
    } catch (err) {
        return { statusCode: 502, body: JSON.stringify({ error: 'Failed to reach Square' }) };
    }
};
