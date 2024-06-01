export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        // get token

        let token;
        const get_token_endpoint = 'http://localhost:3000/api/pesapal-token';
        let d = await fetch(get_token_endpoint);
        let response = await d.json();
        if (response.status == 200) {
            token = response.token;
        }

        const endpoint = 'https://cybqa.pesapal.com/pesapalv3/api/URLSetup/GetIpnList';
        const options = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}` },
        }

        let res = await fetch(endpoint, options);
        let res_json = await res.json();
        if (res.status == 200) {
            console.log(JSON.stringify(res_json));
            return new Response(JSON.stringify(res_json), { status: 200 });
        }
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }

        return new Response("Internal Server Error", { status: 500 });
    }


    return new Error('something occurred please try again');
}