import { db } from "@/app/firebase/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { createHmac } from 'crypto';
import OAuth from 'oauth-1.0a';
import { parse } from 'querystring';
import post from 'got';


export async function POST(req, res) {
    // get pin from twitter
    const body = await req.json();
    const { token_global, identifier, userId } = body;

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


    async function accessToken({ oauth_token }, verifier) {
        try {
            const url = `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${verifier}`
            const authHeader = oauth.toHeader(oauth.authorize({
                url,
                method: 'POST'
            }));
    
            const request = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: authHeader['Authorization'],
                }
            });
            const body = await request.text();
            return Object.fromEntries(new URLSearchParams(body));
        } catch (error) {
            console.error('Error:', error)
            throw error;
        }
    }

    try {
        const oAuthRequestToken =  {
            oauth_token: token_global,
        }
        // get user access token
        const oAuthAccessToken = await accessToken(oAuthRequestToken, identifier);
        console.log(token_global, identifier);
        // save to db
        await setDoc(doc(db, 'twitter-token', userId), {
            'userId': userId,
            'token' : oAuthAccessToken.oauth_token,
            'secret': oAuthAccessToken.oauth_token_secret,
            'active': true,
            'created_at': Timestamp.now()
        });

        return new Response(JSON.stringify({'status':true}), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({'status':false}), { status: 500 });
    }

}