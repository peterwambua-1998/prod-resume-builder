const key = process.env.NEXT_MPESA_KEY;
const secret = process.env.NEXT_MPESA_SECRET;
const shcode = process.env.NEXT_MPESA_SHORTCODE;
// will be given by mpesa once you register for live production
const passKey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';


function getCurrentTimestamp() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return timestamp;
}

function getEncoding(key, secret) {
    let full_string = key + ':' + secret;
    let encoded = btoa(full_string);
    return encoded;
}

async function getToken() {

    let encodedConsumer = 'Basic ' + getEncoding(key, secret);

    try {
        const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
        let token = await fetch(url, {
            'method': 'GET',
            responseType: 'json',
            headers: {
                Authorization: encodedConsumer
            }
        })
        const body = await token.json();
        return body;
    } catch (error) {
        console.log(error);
    }
}


async function initiateStk(amount, phoneNumber) {
    try {
        // token
        let response = await getToken();
        let token = response.access_token;
        let timeStamp = getCurrentTimestamp();
        let password = btoa(shcode+passKey+timeStamp);
        let domain = 'localhost:3000';
        let data = {
            "BusinessShortCode": shcode,
            "Password": password,
            "Timestamp": timeStamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phoneNumber,
            "PartyB": shcode,
            "PhoneNumber": phoneNumber,
            "CallBackURL": `https://${domain}/api/mpesa-callback`,
            "AccountReference": "ResumeBuild",
            "TransactionDesc": "Payment of resume"
        }


        const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        let request = await fetch(url, {
            'method': 'POST',
            responseType: 'json',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const body = await request.json();
        console.log(request);
        return body;
    } catch (error) {
        console.log(error);
    }

}

export async function POST(req, res) {
    // get token
    try {
        let reqBody = await req.json();
        let { phoneNumber, amount } = reqBody;

        // let token = await getToken();
        // console.log(token);
        // return new Response(JSON.stringify(token));
        // let response = await getToken();
        // let token = response.access_token;
        // console.log(token);
        let mpesa_payment = await initiateStk(Number(amount), phoneNumber);
        return new Response(JSON.stringify(mpesa_payment));
    } catch (error) {
        return new Response('error occurred', {status: 500});
    }

}