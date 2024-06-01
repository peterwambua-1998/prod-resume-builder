import post from 'got';
import { createHmac } from 'crypto';
import OAuth from 'oauth-1.0a';
import { parse } from 'querystring';
import readline from 'readline';


const readlines = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function input(prompt) {
    return new Promise(async (resolve, reject) => {
      readlines.question(prompt, (out) => {
        readlines.close();
        resolve(out);
      });
    });
}

// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = '2l5tjkkH7VQikqMePl5jq2Rzi';
const consumer_secret = 'HsRa5lydJNatLqwNH2nJBzsZTMiiSWp2etWpXqgFLcrX4bYHRI';


// Be sure to replace your-user-id with your own user ID or one of an authenticated user
// You can find a user ID by using the user lookup endpoint
const id = "your-user-id";

// You can replace the given Tweet ID with your the Tweet ID you want to Retweet
// You can find a Tweet ID by using the Tweet lookup endpoint


const endpointURL = `https://api.twitter.com/2/tweets`;

// this example uses PIN-based OAuth to authorize the user
// const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';
const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => createHmac('sha1', key).update(baseString).digest('base64')
});

async function requestToken() {
    try {
        const urlEncoded = encodeURIComponent("https://resumer-builder-bcwf.vercel.app/dashboard/twitter");
        const requestTokenURL = `https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write`;
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

// async function requestToken() {
//   const authHeader = oauth.toHeader(oauth.authorize({
//     url: requestTokenURL,
//     method: 'POST'
//   }));
//   const req = await post(requestTokenURL, {
//     headers: {
//       Authorization: authHeader["Authorization"],
//     }
//   });
//   if (req.body) {
//     return parse(req.body);
//   } else {
//     throw new Error('Cannot get an OAuth request token');
//   }
// }


async function accessToken({
  oauth_token,
}, verifier) {
  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`
  
  const authHeader = oauth.toHeader(oauth.authorize({
    url: path,
    method: 'POST'
  }));
  
  const req = await post(path, {
    headers: {
      Authorization: authHeader["Authorization"]
    }
  });
  if (req.body) {
    return parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

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


async function getRequest({
    oauth_token,
    oauth_token_secret
  }) {
  
    const token = {
      key: oauth_token,
      secret: oauth_token_secret
    };
  
    const authHeader = oauth.toHeader(oauth.authorize({
      url: endpointURL,
      method: 'POST'
    }, token));
  
    const req = await post(endpointURL, {
      json: data,
      responseType: 'json',
      headers: {
        Authorization: authHeader["Authorization"],
        'user-agent': "v2CreateTweetJS",
        'content-type': "application/json",
        'accept': "application/json"
      }
    });
    if (req.body) {
      return req.body;
    } else {
      throw new Error('Unsuccessful request');
    }
  }


(async () => {
  try {
    // Get request token
    const oAuthRequestToken = await requestToken();
    // Get authorization
    authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
    console.log('Please go here and authorize:', authorizeURL.href);
    const pin = await input('Paste the PIN here: ');
    // // Get the access token
   
    const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());
    console.log(oAuthAccessToken);
    // Make the request
    // let tt = {
    //     oauth_token: '1680830708221198338-d7LNnxYQKZAIxFRcUorygLpRlkJ7fN',
    //     oauth_token_secret: 'td5vYDtAVhc2EEvfH1WmdPce1pzc58zYe3hk2m2BQbK3M',
    //     user_id: '1680830708221198338',
    //     screen_name: 'PeterWambuch'
    // }
    // const messageResponse = await writeTweet(tt, { 'text': 'Hello Viewers!' });
    // // const response = await getRequest(tt);
    // console.dir(messageResponse, {
    //   depth: null
    // });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();