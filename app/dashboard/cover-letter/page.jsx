'use client'
import { Timestamp, addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Card, Loading, Menu } from "react-daisyui";
import Link from "next/link";

const CoverLetter = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const [coverLetters, setCoverLetters] = useState([]);
    const [checkingCoverLetters, setCheckingCoverLetters] = useState(true);
    var [editClicked, setEditClicked] = useState(false);
    const router = useRouter();
    const [creatingLetter, setCreatingLetter] = useState(false);

    async function checkCoverLetter() {
        try {
            const q = query(collection(db, "cover-letter"), where("userId", "==", firebase_user.uid));
            const querySnapshot = await getDocs(q);
            setCoverLetters([]);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let docId = doc.id;
                const documentData = doc.data();
                const newData = { ...documentData, id: docId };
                setCoverLetters((prev) => [...prev, newData])
            });
            setCheckingCoverLetters(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function createCoverLetterId() {
        setCreatingLetter(true);
        let coverLetterRef = collection(db, 'cover-letter');
        try {
            const res = await addDoc(coverLetterRef, {
                'title': 'Untitled-Document',
                'jobDescription': null,
                'userId': firebase_user.uid,
                'created_at': Timestamp.now()
            });
            router.push(`/dashboard/cover-letter-create/${res.id}`);
        } catch (error) {
            console.log(error);
        }
    }


    function editResume(id) {
        setEditClicked(true);
        router.push(`/dashboard/cover-letter-create/${id}`);
    }

    useEffect(() => {
        checkCoverLetter();
    }, []);


    return (  
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold">Cover Letter</h1>
            </div>
            <div className="p-8 absolute top-[30%] w-full">
                {
                    checkingCoverLetters ? <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-300 rounded-lg"><Loading /><p>Checking cover letters</p></div>
                    :
                    coverLetters.length > 0 ?
                    <div>
                        <div className="bg-slate-100 border border-slate-500 p-5 md:rounded">
                            <div className="md:grid md:grid-cols-4">
                                <div className="p-2" >
                                    <Menu>
                                        <Menu.Item>
                                            <a className="active">Resumes</a>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link href='#' onClick={createCoverLetterId}>{creatingLetter ? <Loading /> : ''} Create Resume</Link>
                                        </Menu.Item>
                                    </Menu>
                                </div>
                                <div className="md:col-span-3">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {
                                            coverLetters.map((resume, index) => (
                                                <Card key={index} className="border-slate-500 bg-white">
                                                    <Card.Body>
                                                        <Card.Title tag="h2">{resume.title}</Card.Title>
                                                        <Card.Actions>
                                                            <Button className="bg-green-500 hover:bg-green-600 border-slate-500 text-black" onClick={() => editResume(resume.id)}>
                                                                {
                                                                    editClicked ? <Loading /> : ''
                                                                }
                                                                Edit
                                                            </Button>
                                                        </Card.Actions>
                                                    </Card.Body>
                                                </Card>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    :
                    <div className="flex justify-center items-center flex-col gap-6 w-full h-[50vh] bg-slate-100 border border-slate-500 rounded-lg">
                        <div>
                            <label className="label pl-2">Create new cover letter</label>
                        </div>
                        <Button onClick={createCoverLetterId} className="bg-amber-400 hover:bg-amber-500 text-black border-none">Create</Button>
                    </div>
                }
            </div>
        </div>
    );
}
 
export default CoverLetter;