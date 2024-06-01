import { createHmac } from 'crypto';
import OAuth from 'oauth-1.0a';

export async function GET(req, res) {
    
    
    const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');

    // api keys
    const consumer_key = '2l5tjkkH7VQikqMePl5jq2Rzi';
    const consumer_secret = 'HsRa5lydJNatLqwNH2nJBzsZTMiiSWp2etWpXqgFLcrX4bYHRI';

    // signature
    const oauth = OAuth({
        consumer: {
            key: consumer_key,
            secret: consumer_secret
        },
        signature_method: 'HMAC-SHA1',
        hash_function: (baseString, key) => createHmac('sha1', key).update(baseString).digest('base64')
    });

    // request token
    async function requestToken() {
        try {
            const urlEncoded = encodeURIComponent("https://resumer-builder-bcwf.vercel.app/dashboard/twitter");
            const requestTokenURL = `https://api.twitter.com/oauth/request_token?oauth_callback=${urlEncoded}&x_auth_access_type=write`;
            const authHeader = oauth.toHeader(oauth.authorize({
                url: requestTokenURL,
                method: 'POST'
            }));

            const request = await fetch(requestTokenURL, {
                'method': 'POST',
                headers: {
                    Authorization: authHeader['Authorization']
                }
            })
            const body = await request.text();
            return Object.fromEntries(new URLSearchParams(body));
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }


    try {
        // Get request token
        const oAuthRequestToken = await requestToken();

        // return link to for user to login to twitter
        authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
        // return link for user to visit
        return new Response(JSON.stringify({link : authorizeURL.href}));
    } catch (error) {
        return new Response(error, {status: 500});

    }
}