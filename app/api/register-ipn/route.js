import fetch from 'node-fetch';
export const dynamic = 'force-dynamic';

export async function GET() {
    //get token
    try {
        let token;
        const get_token_endpoint = 'http://localhost:3000/api/pesapal-token';
        let ds = await fetch(get_token_endpoint);
        let response = await ds.json();
        if (response.status == 200) {
            token = response.token;
        }
        const site_url = 'https://ai-app-49d1e.firebaseapp.com/api/pesapal-transaction'
        const endpoint = 'https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN';

        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "url": site_url,
                "ipn_notification_type": "GET",
            })
        };

        let d = await fetch(endpoint, options);
        let reszz = await d.json();
        console.log(reszz);
        return new Response(JSON.stringify(reszz), { status: 200 });
        
    } catch (error) {
        if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
        }
    
        return new Response("Internal Server Error", { status: 500 });
    }

}