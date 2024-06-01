'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert, Button, Input, Loading, Modal } from "react-daisyui";
import TweetsComponent from "./tweets/tweets";


const Twitter = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loadingGettingToken, setLoadingGettingToken] = useState(true);
    const [dontShowAuthorizationBtn, setDontShowAuthorizationBtn] = useState(false);
    const [tweets, setTweets] = useState([]);
    const [loadingAuthorize, setLoadingAuthorize ] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [aiTweeterContent, setAiTweeterContent] = useState(null);

    const toggleVisible = () => {
        setShowModal(!showModal);
    };

    const toggleVisibleError = () => {
        setShowModalError(!showModalError);
    };


    async function getTweets () {
        try {
            let tweetsRef = collection(db, 'ai-tweets');
            let q = query(tweetsRef, where("userId", "==", firebase_user.uid));
            onSnapshot(q, (doc) => {
                setTweets([]);
                doc.forEach((data) => {
                    let docId = data.id;
                    const documentData = data.data();
                    const newData = { ...documentData, id: docId };
                    setTweets((prev) => [...prev, newData]);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }


    async function checkIFUserHasToken () {
        try {
            let about = await getDoc(doc(db, 'twitter-token', firebase_user.uid));
            if (about.exists()) {
                await getTweets();
                setDontShowAuthorizationBtn(true);
            } else {
                // docSnap.data() will be undefined in this case
                getTwitterTokenSecret();
            }
            setLoadingGettingToken(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function authorizeAccess () {
        setLoadingAuthorize(true);
        try {
            let options = {
                method: 'GET',
            };
            let initPay = await fetch('http://localhost:3000/api/twitter-ai-tweets', options);
            let res = await initPay.json();
            let link = res.link;
            router.push(link);
        } catch (error) {
            console.log(error);
        }
    }

    async function getTwitterTokenSecret() {
        const auth_token = searchParams.get('oauth_token');
        const auth_verifier = searchParams.get('oauth_verifier');
            
        if (auth_token && auth_verifier) {
            setDontShowAuthorizationBtn(true);
            toggleVisible();
            // then we make another request
            try {
                let options = {
                    method: 'POST',
                    body: JSON.stringify({
                        'token_global': auth_token,
                        'identifier': auth_verifier,
                        'userId': firebase_user.uid
                    }),
                };
                let twitterUserToken = await fetch('http://localhost:3000/api/twitter-save-user-token', options);
                let res = await twitterUserToken.json();
                // show modal
                if (!res.status && res.status == false) {
                    toggleVisible();
                    // show error modal
                    toggleVisibleError();
                    // show authorize btn
                    setDontShowAuthorizationBtn(false);
                    // delete twitter doc and show authorize btn
                    await deleteDoc(doc(db, 'twitter-token', firebase_user.uid));
                }
            } catch (error) {
                toggleVisible();
                // show error modal
                toggleVisibleError();
                // show authorize btn
                setDontShowAuthorizationBtn(false);
                // delete twitter doc and show authorize btn
                await deleteDoc(doc(db, 'twitter-token', firebase_user.uid));
            }
        }
    }

    // save user content
    async function saveContent () {
        try {
            const twitterTokenRef = doc(db, 'twitter-token', firebase_user.uid);
            await updateDoc(twitterTokenRef, {
                content: aiTweeterContent
            });
            // close modal
            toggleVisible();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIFUserHasToken();
        getTweets();
    }, [])

    return (

        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold mb-2">TweetCraft</h1>
                <p className="text-sm">Your AI-Powered Social Media Wordsmith!</p>
            </div>
            <div className="p-8 absolute top-[26%] w-full">
                {
                    loadingGettingToken ? <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-100 border border-slate-500 rounded-lg">
                        <Loading />
                        <p>Loading</p>
                    </div> : 
                    dontShowAuthorizationBtn ? 
                    <TweetsComponent tweets={tweets} userId={firebase_user.uid} />: 
                    <div className="p-8 w-full bg-slate-100 rounded-lg border border-slate-500">
                        <div className="text-center">
                            <p className="font-bold text-lg mb-2">Introducing TweetCraft: Your AI-Powered Social Media Wordsmith!</p>
                            <p className="text-sm border-b leading-relaxed tracking-wide border-slate-300 pb-10">Welcome to our innovative TweetCraft feature! Unleash the power of AI to effortlessly craft captivating tweets on your behalf. Whether you're seeking to share your thoughts, promote your brand, or engage your audience, TweetCraft is your ultimate companion in the world of social media. Say goodbye to writer's block and hello to seamless tweeting brilliance!</p>
                        </div>
                        <div className="text-center mt-10">
                            <p className="mb-16 font-semibold">Click link below to authorize web app to access your twitter account.</p>
                            <Button onClick={() => authorizeAccess()} className="mb-8 bg-amber-500 w-[70%] text-black">
                                {
                                    loadingAuthorize ? <Loading /> : ""
                                }
                                Authorize
                            </Button>
                        </div>
                    </div>
                }
                
            </div>

            <Modal.Legacy open={showModal} className="bg-white max-w-5xl">
                <Modal.Header >
                    <p className="text-lg mb-0 border-b pb-4">Save Cover Letter</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div>
                        <label className="label">Tweeter Content</label>
                        <p className="text-sm text-[#808080]">Ai will generate content base on your topic. Your free to change the topic at any time</p>
                        <Input className='bg-white w-full' placeholder='Ex:Mechanical Engineering' defaultValue={aiTweeterContent} onChange={(e) => setAiTweeterContent(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisible} >Close</Button>
                    <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={saveContent}>Save</Button>
                </Modal.Actions>
            </Modal.Legacy>

            <Modal.Legacy open={showModalError} className="bg-white max-w-5xl">
                <Modal.Header >
                    <p className="text-lg mb-0 border-b pb-4">Error ocurred</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div>
                        <p>An error ocurred while authorizing your account. Click authorize again.</p>
                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisibleError} >Close</Button>
                </Modal.Actions>
            </Modal.Legacy>
        </div>
    );
}

export default Twitter;