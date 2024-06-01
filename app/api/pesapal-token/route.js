import fetch from 'node-fetch';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const token_url = 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken';

        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({
                "consumer_key": `${process.env.NEXT_PESAPAL_COSUMER_KEY}`,
                "consumer_secret": `${process.env.NEXT_PESAPAL_COSUMER_SECRET}`,
            }),
        };

        let d = await fetch(token_url, options);
        let reszz = await d.json();
        return new Response(JSON.stringify(reszz), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }

        return new Response("Internal Server Error", { status: 500 });
    }

}