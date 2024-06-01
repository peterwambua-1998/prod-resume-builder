'use client';
import { auth, db } from "@/app/firebase/firebase";
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Card, Button, Loading, Modal } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import resumeImage from '@/app/images/website-1.png';
import siteTwo from '@/app/images/site-two.png';
import siteThree from '@/app/images/site-three.png';
import Image from "next/image";

const WebsiteList = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const [website, setWebsite] = useState(null);
    const [checkingResume, setCheckingResume] = useState(true);
    const [chosenSite, setChosenSite] = useState(null);
    const [visible, setVisible] = useState(false);
    const [savingSiteOne, setSavingSiteOne] = useState(false);
    const [savingSiteTwo, setSavingSiteTwo] = useState(false);
    const [savingSiteThree, setSavingSiteThree] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    async function checkWebsite() {
        try {
            const docSnap = await getDoc(doc(db, "user-website", firebase_user.uid));
            if (docSnap.exists()) {
                setWebsite(docSnap.data());
            }
            setCheckingResume(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function saveChoosenResume(type) {
        try {
            if (type == 1) {
                setSavingSiteOne(true);
            }

            if (type == 2) {
                setSavingSiteTwo(true);
            }

            if (type == 3) {
                setSavingSiteThree(true);
            }
            setChosenSite(type);

            let data = {
                'site_type': type,
                'created_at': Timestamp.now()
            }

            await setDoc(doc(db, "user-website", firebase_user.uid), data);
            
            toggleVisible();

            if (type == 1) {
                setSavingSiteOne(false);
            }

            if (type == 2) {
                setSavingSiteTwo(false);
            }

            if (type == 3) {
                setSavingSiteThree(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkWebsite();
    }, [])

    return (
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold">Website</h1>
            </div>
            <div className="p-8 absolute top-[30%] w-full">
                {
                    checkingResume ?
                        <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-100 border border-slate-500 rounded-lg"><Loading /><p>Checking resumes</p></div>
                        :
                       
                            // has no webiste so show webiste previews
                            <div className="w-full p-10 bg-slate-100 border border-slate-500 rounded-lg">
                                {
                                    website != null ? 
                                    <p className="mb-6 text-[8%] md:text-sm lg:text-sm">Website link: <Link target="_blank" className="text-blue-500 underline text-[8%] md:text-sm lg:text-sm" href={`/site/${firebase_user.uid}`}>{document.location.origin}/site/{firebase_user.uid}</Link></p> 
                                    : <p className="text-sm mb-6">You can preview the templates and select one</p>
                                }
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 lg:gap-10">
                                    <Card className="bg-white">
                                        <div className="p-2">
                                            <Image src={resumeImage} width={520} className="w-[100%] rounded-lg" />
                                        </div>
                                        <Card.Body >
                                            <Card.Title tag="p" className="text-base mb-4">Website One</Card.Title>
                                            <Card.Actions className="">
                                                <Link target="_blank" href='/websites/site-one'><Button className="bg-[#FAA54D] hover:bg-[#D97706] text-black border-none">Preview</Button></Link>
                                                <Button className="border-[#FAA54D] hover:border-[#D97706] text-[#FAA54D]" variant="outline" onClick={() => saveChoosenResume(1)}>
                                                    {savingSiteOne ? <Loading /> : ''}
                                                    Select</Button>
                                            </Card.Actions>
                                        </Card.Body>
                                    </Card>

                                    <Card className="bg-white">
                                        <div className="p-2">
                                            <Image src={siteTwo} width={520} className="w-[100%] rounded-lg" />
                                        </div>
                                        <Card.Body >
                                            <Card.Title tag="p" className="text-base mb-4">Website Two</Card.Title>
                                            <Card.Actions className="">
                                                <Link target="_blank" href='/websites/site-two'><Button color="success">Preview</Button></Link>
                                                <Button className="text-black" color="success" variant="outline" onClick={() => saveChoosenResume(2)}>
                                                {savingSiteTwo ? <Loading /> : ''}
                                                    Select</Button>
                                            </Card.Actions>
                                        </Card.Body>
                                    </Card>

                                    <Card className="bg-white">
                                        <div className="p-2">
                                            <Image src={siteThree} width={520} className="w-[100%] rounded-lg" />
                                        </div>
                                        <Card.Body >
                                            <Card.Title tag="p" className="text-base mb-4">Website Three</Card.Title>
                                            <Card.Actions className="">
                                                <Link target="_blank" href='/websites/site-three'><Button color="primary">Preview</Button></Link>
                                                <Button className="border-violet-500 hover:border-violet-600 text-violet-500" variant="outline" onClick={() => saveChoosenResume(2)}>
                                                    {savingSiteThree ? <Loading /> : ''}
                                                    Select</Button>
                                            </Card.Actions>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                }

            </div>

            <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                <Modal.Header className="font-bold">Website Url</Modal.Header>
                <Modal.Body className="p-0">
                    <div>
                        <p>Hurray, your site is ready!</p>
                        <p>click <Link target="_blank" href={`/site/${firebase_user.uid}`}>here</Link> to view</p>
                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisible} >Close</Button>
                </Modal.Actions>
            </Modal.Legacy>
        </div>
    );
}

export default WebsiteList;