'use client'

import { auth, db } from "@/app/firebase/firebase";
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Accordion, Alert, Button, Checkbox, Divider, Input, Loading, Modal, Textarea, Toggle } from 'react-daisyui';
import { useAuthState } from "react-firebase-hooks/auth";
import WrapperCoverLetter from "../../cover-letter-design/wrapper";
import resumeImage from '@/app/images/rm2.png';
import Image from 'next/image';


const CoverLetter = ({ params }) => {
    const [coverLetterTitle, setCoverLetterTitle] = useState(null);
    // check if there is content in firebase and ai content
    const [queryingForJobDesc, setQueryForJobDesc] = useState(true);
    const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(false);
    const [jobDescription, setJobDescription] = useState(null);
    const [firebase_user, loadings, error] = useAuthState(auth);
    const [visible, setVisible] = useState(false);
    const [visibleSave, setVisibleSave] = useState(false);
    // store the response from open ai - cover letter content
    const [coverLetterAi, setCoverLetterAi] = useState([]);
    const [activeAbout, setActiveAbout] = useState(null);

    const [viewHeight, setViewHeight] = useState('h-[120vh]');

    const [addressTo, setAddressedTo] = useState(null);

    const [loading, setLoading] = useState(false);

    const [showSaveAlert, setShowSaveAlert] = useState(false);

    const [aboutAiSaved, setAboutAiSaved] = useState(null);

    const [savingDoc, setSavingDoc] = useState(false);


    // modal content
    const toggleVisible = () => {
        setVisible(!visible);
    };

    const toggleVisibleSave = () => {
        setTimeout(() => {
            setShowSaveAlert(false);
        }, 3000);
        setVisibleSave(!visibleSave);
    };

    async function saveAddressTo() {
        setLoading(true);
        try {
            let coverLetterRef = doc(db, 'cover-letter', params.id);
            const res = await updateDoc(coverLetterRef, {
                'to': addressTo,
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }



    async function getCoverLetterAi() {
        // show loading spinner
        setQueryForJobDesc(true);

        let exps = `i would like a well crafted and creative cover letter based on job description. Job description is ${jobDescription}. My current about`;

        // about content
        const docRef = doc(db, "about", firebase_user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let about = docSnap.data()['description'];
            exps += `${about}.`;
        }

        // experience
        exps += "my experiences are ";
        const q = query(collection(db, "experience"), where("user_id", "==", firebase_user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.title} ${res.companyName} - ${res.employmentType} ${res.startDate} - ${res.endDate} ${res.location} - ${res.locationType} ${res.description}.`;
        });

        // get users skills
        exps += 'my skills include ';
        let skills = [];
        const qS = query(collection(db, "skill"), where("user_id", "==", firebase_user.uid));
        const querySnapshotS = await getDocs(qS);
        querySnapshotS.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.name},`;
        });


        // languages
        exps += 'languages i speak include ';
        const qL = query(collection(db, "languages"), where("user_id", "==", firebase_user.uid));
        const querySnapshotL = await getDocs(qL);
        querySnapshotL.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.name},`;
        });

        //hobbies
        let hobbies = [];
        exps += 'I also have hobbies like ';
        const qH = query(collection(db, "hobbies"), where("user_id", "==", firebase_user.uid));
        const querySnapshotH = await getDocs(qH);
        querySnapshotH.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.title},`;
        });

        exps += ' Be creative in making the cover letter wordings mix things up and give me two versions that is version-1 version-2. Always return JSON.';
        // add the rest of the content

        const options = {
            method: 'POST',
            body: JSON.stringify({
                "userContent": exps,
            }),
        };

        try {
            const aboutAI = await fetch('/api/open-ai-cover-letter', options);
            const res = await aboutAI.json();
            let resCoverLetterAi = [
                { id: 1, checked: false, coverLetter: res['version-1'] },
                { id: 2, checked: false, coverLetter: res['version-2'] }
            ];
            setCoverLetterAi(resCoverLetterAi);
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(false);
            toggleVisible();
            setViewHeight('h-[100%]');
        } catch (error) {
            console.log(error);
        }
    }

    function setActive(value) {
        setActiveAbout(value);
    }

    function setChangedAboutAi(value, id) {
        const updatedAbout = coverLetterAi.map((checkbox) => {
            if (checkbox.id === id) {
                checkbox.coverLetter = value;
                if (checkbox.checked) {
                    setActiveAbout(value);
                }
                return { ...checkbox };
            } else {
                return { ...checkbox };
            }
        });
        setCoverLetterAi(updatedAbout);
    }

    function initiateSave() {
        toggleVisibleSave();
    }

    // check if the cover letter is already saved
    async function checkIfResumeIsSaved() {
        // get resume by id
        try {
            const coverLetterRef = doc(db, 'cover-letter', params.id);
            const res = await getDoc(coverLetterRef);
            let data = res.data();
            if (res) {
                let description = data['jobDescription'];
                if (description) {
                    // delete previous saved data
                    const q = query(collection(db, "cover-letter-ai-suggestions"), where("cover_letter", "==", params.id));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach(async (data) => {
                        if (data.data()) {
                            await deleteDoc(doc(db, 'cover-letter-ai-suggestions', data.id));
                        }
                    });
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // determine if it has jo description first before even showing it
    async function detJobDesc() {
        const docRef = doc(db, "cover-letter", params.id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data.jobDescription === null) {
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(true);
            setAddressedTo('');
            setViewHeight('h-[90vh]');
        } else {
            // get the data from firebase and show resume as it was saved
            await getResumeDataAsItWas();
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(false);
            setAddressedTo(data.to);
            setViewHeight('h-[100%]');

        }
    }

    async function getResumeDataAsItWas() {
        try {
            //resume title
            const coverRef = doc(db, 'cover-letter', params.id);
            const res = await getDoc(coverRef);
            let data = res.data();
            if (data) {
                setCoverLetterTitle(data['title']);
                setJobDescription(data['jobDescription'])
            }
            // get about from firestore
            const q = query(collection(db, "cover-letter-ai-suggestions"), where("cover_letter", "==", params.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    let data = doc.data();
                    console.log(doc.data());
                    let d = [
                        { id: data.letter_one_id, checked: data.letter_one_checked, coverLetter: data.letter_one_about },
                        { id: data.letter_two_id, checked: data.letter_two_checked, coverLetter: data.letter_two_about },
                    ]
                    setCoverLetterAi(d);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function saveResume() {
        // check if there is recent save if setSkillAiSaved has data
        setSavingDoc(true);
        let deletes = await checkIfResumeIsSaved();
        if (deletes) {
            //save resume at current state including ai suggestions including resume name
            try {
                let coverLetterRef = doc(db, 'cover-letter', params.id);
                let aiSuggestionsRef = collection(db, 'cover-letter-ai-suggestions');
                const res = await updateDoc(coverLetterRef, {
                    'title': coverLetterTitle,
                    'jobDescription': jobDescription,
                });

                const aboutAiAboutResponse = await addDoc(aiSuggestionsRef, {
                    'cover_letter': params.id,
                    'letter_one_id': coverLetterAi[0].id,
                    'letter_one_about': coverLetterAi[0].coverLetter,
                    'letter_one_checked': coverLetterAi[0].checked,
                    'letter_two_id': coverLetterAi[1].id,
                    'letter_two_checked': coverLetterAi[1].checked,
                    'letter_two_about': coverLetterAi[1].coverLetter,
                });

                setAboutAiSaved(aboutAiAboutResponse.id);
                setShowSaveAlert(true);
                
                toggleVisibleSave();
                setSavingDoc(false);

            } catch (error) {
                console.log(error);
            }
        }
    }

    function changeMarkedCheckBox(id) {
        const updatedCheckboxes = coverLetterAi.map((checkbox) => {
            return checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : { ...checkbox, checked: false }
        });
        setCoverLetterAi(updatedCheckboxes);
    }

    useEffect(() => {
        detJobDesc();
    }, []);

    return (
        <div className={"my-resume-bg " + viewHeight + ""}>
            {
                queryingForJobDesc ?
                    <div className='flex min-h-screen items-center justify-center flex-col'>
                        <p>Getting your cover letter ready, hang on!</p>
                        <Loading />
                    </div>

                    : showJobDescriptionInput ?

                        <div className='pl-8 pr-8 flex flex-col gap-8 items-center'>
                            <Image src={resumeImage} alt='ai-resume' width={520} height={520} className='w-[36vw] h-[35vh] md:w-[18vw] md:h-[36vh]' />
                            <div className='w-full text-center'>
                                <p className='font-semibold mb-4'>Welcome, spark up your cover letter</p>
                                <p className='text-black/50 mb-4'>Enter job description below</p>

                                <div className='
                                overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full flex-grow relative border rounded-2xl bg-token-main-surface-primary border-token-border-medium
                                '>
                                    <Textarea placeholder='Job description...' onChange={(e) => setJobDescription(e.target.value)} className='h-[20vh] 
                                    m-0 w-full resize-none border-0 bg-white focus:ring-0 focus-visible:ring-0  py-[10px] pr-10 md:py-3.5 md:pr-12 placeholder-black/50 pl-4 md:pl-6
                                    ' />
                                    {/* <Input onChange={(e) => setJobDescription(e.target.value)} type='text' className='w-full bg-transparent border-none rounded-none' placeholder='Enter job description here...' /> */}
                                    <Button className='
                                    absolute bottom-1.5 right-2 rounded-lg border border-black bg-black p-0.5 text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10  md:bottom-3 md:right-3
                                    ' onClick={getCoverLetterAi}>submit</Button>
                                </div>
                            </div>
                        </div>

                        :
                        <div className="md:grid md:grid-cols-7 lg:grid lg:grid-cols-4 bg-slate-200">
                            <div className="absolute right-0 top-3">
                                {
                                    showSaveAlert ?
                                        <Alert className="bg-green-600 text-black border border-slate-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>}>
                                            <span>Document saved!</span>
                                        </Alert>
                                        : ''
                                }
                            </div>
                            <div className="bg-white md:col-span-2 lg:col-span-1 h-[30vh] overflow-y-auto md:h-[100%] pt-2 pl-5 pr-5 ">
                                <div className='mb-4'>
                                    <Button className='bg-green-400 hover:bg-green-500 text-black border-slate-400 w-full' onClick={initiateSave}>Save Resume</Button>
                                </div>
                                <Accordion defaultChecked className="bg-amber-400 text-black mb-3">
                                    <Accordion.Title className="text-xl font-medium text-black">
                                        <p className="text-base font-semibold">AI Content suggestions</p>
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="form-control w-full grow">
                                            <div className="">
                                                <Button className="bg-amber-200 border-amber-500 text-black hover:bg-amber-600" onClick={toggleVisible}>View</Button>
                                            </div>
                                        </div>
                                    </Accordion.Content>
                                </Accordion>


                                <Accordion className="bg-amber-400 text-black mb-3">
                                    <Accordion.Title className="text-xl font-medium text-black">
                                        <p className="text-base font-semibold">Addressed To</p>
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="form-control w-full grow">
                                            <Input placeholder="To: Mr Joe / Mrs Pam" defaultValue={addressTo} className="bg-white text-black" onChange={(e) => setAddressedTo(e.target.value)} />
                                            <div className="mt-2">
                                                <Button className="bg-amber-200 border-amber-500 text-black hover:bg-amber-600" onClick={saveAddressTo} >{loading == true ? <Loading /> : ''} Save</Button>
                                            </div>
                                        </div>
                                    </Accordion.Content>
                                </Accordion>
                            </div>

                            <div className="md:col-span-5 lg:col-span-3">
                                <div>
                                    <WrapperCoverLetter coverLetter={coverLetterAi} userId={firebase_user.uid} coverLetterId={params.id} />
                                </div>


                                <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                                    <Modal.Header >
                                        <p className="text-lg mb-0 border-b pb-4">Ai Content suggestions</p>
                                    </Modal.Header>
                                    <Modal.Body className="p-0">
                                        <div className='border border-slate-500 rounded-lg p-6 w-full mb-8'>
                                            <p className='text-base mb-6'>About</p>
                                            {
                                                coverLetterAi.length > 0 ?
                                                    coverLetterAi.map((about, index) => (
                                                        <div className='flex gap-4 mb-3' key={index}>
                                                            <Checkbox
                                                                checked={about.checked}
                                                                color="primary"
                                                                value={about.coverLetter}
                                                                onClick={(e) => {
                                                                    setActive(e.target.value);
                                                                    changeMarkedCheckBox(about.id);
                                                                }}
                                                            />
                                                            <Textarea onChange={(e) => setChangedAboutAi(e.target.value, about.id)} defaultValue={about.coverLetter} className='w-full bg-white h-[40vh]' />
                                                        </div>
                                                    ))
                                                    : ''
                                            }

                                        </div>
                                    </Modal.Body>
                                    <Modal.Actions>
                                        <Button type="button" onClick={toggleVisible} >Close</Button>

                                    </Modal.Actions>
                                </Modal.Legacy>
                            </div>
                        </div>



            }

            <Modal.Legacy open={visibleSave} className="bg-white max-w-5xl">
                <Modal.Header >
                    <p className="text-lg mb-0 border-b pb-4">Save Cover Letter</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div>
                        <label className="label">Cover letter title</label>
                        <Input className='bg-white w-full' placeholder='Ex: Job title' defaultValue={coverLetterTitle} onChange={(e) => setCoverLetterTitle(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisibleSave} >Close</Button>
                    <Button type="button" className="bg-[#F59E0B] hover:bg-amber-600 text-white border-none" onClick={saveResume}>
                        {
                            savingDoc ? <Loading /> : ''
                        }
                        Save</Button>
                </Modal.Actions>
            </Modal.Legacy>

        </div>

    );
}

export default CoverLetter;