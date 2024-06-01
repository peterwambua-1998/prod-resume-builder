'use client'

import { db } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Input, Loading, Modal } from "react-daisyui";

const TweetsComponent = ({ tweets, userId, disabled }) => {
    let aitweets = tweets;

    const [changeTopicModal, setChangeTopicModal] = useState(false);
    const [disableFeatureModal, setDisableFeatureModal] = useState(false);
    const [activateFeatureModal, setActiveFeatureModal] = useState(false);
    const [aiTweeterContent, setAiTweeterContent] = useState(null);
    const [isFeatureDisabled, setIsFeatureDisabled] = useState(null);
    const [loadingIsDisabled, setLoadingIsDisabled] = useState(true);

    function toggleVisibleTopic() {
        setChangeTopicModal(!changeTopicModal);
    }

    function toggleVisibleDisable() {
        setDisableFeatureModal(!disableFeatureModal);
    }


    function toggleVisibleActive() {
        setActiveFeatureModal(!activateFeatureModal);
    }


    // save user content
    async function updateContent() {
        try {
            const twitterTokenRef = doc(db, 'twitter-token', userId);
            await updateDoc(twitterTokenRef, {
                content: aiTweeterContent
            });
            // close modal
            toggleVisibleTopic();
        } catch (error) {
            console.log(error);
        }
    }

    // disable feature
    async function disableFeature() {
        try {
            const twitterTokenRef = doc(db, 'twitter-token', userId);
            await updateDoc(twitterTokenRef, {
                active: false
            });
            // close modal
            toggleVisibleDisable();
        } catch (error) {
            console.log(error);
        }
    }


    // disable feature
    async function loadingFeature() {
        try {

            onSnapshot(doc(db, "twitter-token", userId), doc => {
                if (doc.data()) {
                    setIsFeatureDisabled(doc.data()['active']);
                }
            });
            // close modal
            setLoadingIsDisabled(false);
        } catch (error) {
            console.log(error);
        }
    }


    // disable feature
    async function activateFeature() {
        try {
            const twitterTokenRef = doc(db, 'twitter-token', userId);
            await updateDoc(twitterTokenRef, {
                active: true
            });
            // close modal
            toggleVisibleActive();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadingFeature();
    }, [])

    return (
        <div>
            {
                aitweets.length == 0 ?
                    <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-100 border border-slate-500 rounded-lg">
                        <p>Ai tweets will appear here</p>
                    </div>
                    :
                    <div className="w-full bg-slate-100 border border-slate-500 rounded-lg">
                        <div className="border-b border-slate-200 flex justify-between">
                            <div className="pl-5 pt-2">
                                <p>Topic: <span className="font-semibold">HTML and CSS</span></p>
                            </div>
                            <div className="p-2 flex flex-row-reverse gap-4 ">
                                {
                                    loadingIsDisabled ? <Loading /> :
                                        isFeatureDisabled ?
                                            <Button color="error" variant="outline" size="sm" onClick={toggleVisibleDisable}>Deactivate Feature</Button>
                                            :
                                            <Button color="success" variant="outline" size="sm" onClick={toggleVisibleActive}>Active Feature</Button>

                                }

                                <Button color="success" variant="outline" size="sm" onClick={toggleVisibleTopic}><p className="text-sm">Change Topic</p></Button>
                            </div>
                        </div>

                        <div className="md:col-span-3 p-5">
                            <div className="grid grid-cols-4 gap-4">
                                {
                                    tweets.map((tweet, index) => (
                                        <div className="bg-white rounded-md p-2 border" key={index}>
                                            <p className="font-semibold text-sm">Tweet</p>
                                            <p className="text-xs">{tweet.tweet}</p>
                                        </div>
                                    ))
                                }
                                
                            </div>
                        </div>
                    </div>
            }


            <Modal.Legacy open={changeTopicModal} className="bg-white max-w-5xl">
                <Modal.Header >
                    <p className="text-lg mb-0 border-b pb-4">Topic</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <label className="label">Tweeter Content</label>
                    <p className="text-sm text-[#808080] label">Ai will generate content base on your topic. Your free to change the topic at any time</p>
                    <Input className='bg-white w-full' placeholder='Ex: Mechanical Engineering' defaultValue={aiTweeterContent} onChange={(e) => setAiTweeterContent(e.target.value)} />
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisibleTopic} >Close</Button>
                    <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={updateContent}>Save</Button>
                </Modal.Actions>
            </Modal.Legacy>

            <Modal.Legacy open={disableFeatureModal} className="bg-white max-w-5xl">
                <Modal.Header >
                    <p className="text-lg mb-0 border-b pb-4">Disable Feature</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div>
                        <p>Are you sure you want to disable feature?</p>
                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisibleDisable} >Close</Button>
                    <Button type="button" className="bg-red-500 text-black border-none" onClick={disableFeature}>Save</Button>
                </Modal.Actions>
            </Modal.Legacy>

            <Modal.Legacy open={activateFeatureModal} className="bg-white max-w-5xl">
                <Modal.Header >
                    <p className="text-lg mb-0 border-b pb-4">Activate Feature</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div>
                        <p>Are you sure you want to activate feature?</p>
                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisibleActive} >Close</Button>
                    <Button type="button" className="bg-green-500 text-black border-none" onClick={activateFeature}>Save</Button>
                </Modal.Actions>
            </Modal.Legacy>
        </div>
    );
}

export default TweetsComponent;