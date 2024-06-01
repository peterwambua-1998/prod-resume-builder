export const dynamic = 'force-dynamic';

export async function POST(req, res) {
    //get token
    let token;
    const get_token_endpoint = 'https://ai-app-49d1e.web.app/api/pesapal-token';
    let d = await fetch(get_token_endpoint);
    let response = await d.json();
    if (response.status == 200) {
        token = response.token;
    }
    // get ipns
    let ipn;
    const get_ipns_endpoint = 'https://ai-app-49d1e.web.app/api/pesapal-list-ipn';
    let inp_response = await fetch(get_ipns_endpoint);
    let inp_response_json = await inp_response.json();
    if (inp_response_json.status == 200) {
        ipn = response;
    }

    const subscription_endpoint = 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest';

    const options = {
        method: 'POST',
        headers: {'content-type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({
            "id": "TEST1515111110",
            "currency": "KES",
            "amount": 100.00,
            "description": "Payment description goes here",
            "callback_url": "https://ai-app-49d1e.firebaseapp.com/dashboard/subscription/",
            "notification_id": ipn,
            "billing_address": {
                "email_address": "john.doe@example.com",
                "phone_number": null,
                "country_code": "",
                "first_name": "John",
                "middle_name": "",
                "last_name": "Doe",
                "line_1": "",
                "line_2": "",
                "city": "",
                "state": "",
                "postal_code": null,
                "zip_code": null
            }
        })
    };

    let subscription_response = await fetch(subscription_endpoint, options);
    if(subscription_response.status == 200) {
        let json_subscription_response = await subscription_response.json();
        return Response(json_subscription_response, { status: 200 });
    } else {
        throw Error(`error occurred ${subscription_response.status}`)
    }
}