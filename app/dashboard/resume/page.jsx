'use client';
import { auth, db } from "@/app/firebase/firebase";
import { Timestamp, addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Card, Button, Loading } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";

const CurriculumVitae = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const [resumes, setResumes] = useState([]);
    const [checkingResume, setCheckingResume] = useState(true);
    const [editClicked, setEditClicked] = useState(false);
    const [loadingResumeCreate, setLoadingResumeCreate] = useState(false);

    const router = useRouter();

    async function checkResume() {
        try {
            const q = query(collection(db, "users-resumes"), where("userId", "==", firebase_user.uid));
            const querySnapshot = await getDocs(q);
            setResumes([]);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let docId = doc.id;
                const documentData = doc.data();
                const newData = { ...documentData, id: docId };
                setResumes((prev) => [...prev, newData])
            });
            setCheckingResume(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function createResumeId() {
        setLoadingResumeCreate(true);
        let resumeRef = collection(db, 'users-resumes');
        try {
            const res = await addDoc(resumeRef, {
                'title': 'Untitled-Resume',
                'jobDescription': null,
                'userId': firebase_user.uid,
                'created_at': Timestamp.now()
            });
            router.push(`/dashboard/rs-create/${res.id}`);

        } catch (error) {
            console.log(error);
        }
    }

    function editResume(id) {
        setEditClicked(`true-${id}`);
        router.push(`/dashboard/rs-create/${id}`);
    }

    useEffect(() => {
        checkResume();
    }, []);

    return (
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold">Resume</h1>
            </div>
            <div className="p-8 absolute top-[30%] w-full">
                {
                    checkingResume ?
                        <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-100 border border-slate-500 rounded-lg"><Loading /><p>Checking resumes</p></div>
                        :
                        resumes.length > 0 ?
                            // has resume
                            <div>
                                <div className=" p-5 md:rounded bg-slate-100 border border-slate-500">
                                    <div className="md:grid md:grid-cols-4">
                                        <div className="p-2" >
                                            <Menu>
                                                <Menu.Item>
                                                    <a className="active">Resumes</a>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link href='#' onClick={createResumeId}>Create Resume</Link>
                                                </Menu.Item>
                                            </Menu>
                                        </div>
                                        <div className="md:col-span-3">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {
                                                    resumes.map((resume, index) => (
                                                        <Card key={index} className="border-slate-500 bg-white text-center">
                                                            <Card.Body>
                                                                <Card.Title tag="h2">{resume.title}</Card.Title>
                                                                <Card.Actions >
                                                                    <Button className="bg-green-500 hover:bg-green-600 border-slate-500 text-black" onClick={() => editResume(resume.id)}>
                                                                        {
                                                                            (editClicked == `true-${resume.id}`) ? <Loading /> : ''
                                                                        }
                                                                        View
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
                            // has no resume
                            <div className="flex justify-center items-center flex-col gap-20 w-full h-[50vh] bg-slate-100 border border-slate-500 rounded-lg">
                                <div>
                                    <label className="label pl-2">Create new resume</label>
                                    <Button className="bg-amber-400 hover:bg-amber-500 border-slate-200 text-black" onClick={createResumeId}>
                                        {
                                            loadingResumeCreate ? <Loading /> : <span></span>
                                        }
                                        Create new resume</Button>
                                </div>
                            </div>

                }

            </div>
        </div>
    );
}

export default CurriculumVitae;