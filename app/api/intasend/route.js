import IntaSend from "intasend-node";

export async function POST(req, res) {
    let reqBody = await req.json();
    let {amount, first_name, last_name, subscription_type, email} = reqBody;
    try {
        let intasend = new IntaSend(
            process.env.NEXT_INTASEND_PUBLIC_KEY,
            process.env.NEXT_INTASEND_PRIVATE_KEY,
            true
        );

        let collection = intasend.collection();
        let initiate = await collection.charge({
            first_name: first_name,
            last_name: last_name,
            email: email,
            host : 'http://localhost:3000/',
            amount: amount,
            currency: 'KES',
            api_ref: 'test',
            redirect_url: `http://localhost:3000/dashboard/payment-thank-you?subscriptionType=${subscription_type}`
        })
        return new Response(JSON.stringify(initiate));
    } catch (error) {
        console.log(error);
        return new Response(error)
    }

}