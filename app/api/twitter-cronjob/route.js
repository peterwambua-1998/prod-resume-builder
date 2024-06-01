import OAuth from "oauth-1.0a";
import OpenAI from "openai";
import { createHmac } from 'crypto';
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

export async function GET(req) {
    const openAi = new OpenAI({ apiKey: process.env.NEXT_OPEN_AI_API_KEY });
    const consumer_key = '2l5tjkkH7VQikqMePl5jq2Rzi';
    const consumer_secret = 'HsRa5lydJNatLqwNH2nJBzsZTMiiSWp2etWpXqgFLcrX4bYHRI';
    
    //0auth
    const oauth = OAuth({
        consumer: {
          key: consumer_key,
          secret: consumer_secret
        },
        signature_method: 'HMAC-SHA1',
        hash_function: (baseString, key) => createHmac('sha1', key).update(baseString).digest('base64')
      });
    
    // tweet endpoint
    async function writeTweet({ oauth_token, oauth_token_secret }, tweet) {
        const token = {
            key: oauth_token,
            secret: oauth_token_secret
        }
    
        const url = 'https://api.twitter.com/2/tweets';
    
        const headers = oauth.toHeader(oauth.authorize({
            url,
            method: 'POST'
        }, token));
    
        try {
            const request = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(tweet),
                responseType: 'json',
                headers: {
                    Authorization: headers['Authorization'],
                    'user-agent': 'V2CreateTweetJS',
                    'content-type': 'application/json',
                    'accept': 'application/json'
                }
            })
            const body = await request.json();
            return body;
        } catch (error) {
            console.error('Error:', error)
        }
    }
    
    // 1. get all users with tokens
    let userTokens = [];
    const querySnapshot = await getDocs(collection(db, "twitter-token"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userTokens.push(doc.data());
    });
    
    const collectionRef = collection(db, 'ai-tweets');
    
    // loop through each user token
    for (let i = 0; i < userTokens.length; i++) {
        try {
            let userToken = userTokens[i];
            let token = userToken.token;
            let secret = userToken.secret;
            let content = userToken.content;
            let userId = userToken.userId;
            
            // formulate content using ai 
            let completion = await openAi.chat.completions.create({
                model: 'gpt-3.5-turbo',
                response_format: { type: "json_object" },
                messages: [
                    { role: "system", content: "from now on you will generate twitter tweet content. I need one version in JSON for example {tweet: ai-content}. Always return JSON." },
                    { role: "user", content: `Write me a tweet about ${content}` }
                ],
                temperature: 0.85,
                max_tokens: 500,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
    
            let tweet = completion.choices[0].message.content;
            let tweetToken = {
                oauth_token: token,
                oauth_token_secret: secret,
            }
            let tweetObj = JSON.parse(tweet);
            await writeTweet(tweetToken, { 'text': `${tweetObj.tweet}` });

            let data = {
                'tweet': tweetObj.tweet,
                'userId':  userId,
                'created_at': Timestamp.now(),
            }
    
            await addDoc(collectionRef, data);
        } catch (error) {
            console.log(error);
            continue; 
        }
    }

    return Response.json(true,{status: 200});
}