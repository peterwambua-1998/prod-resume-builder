'use client'

import { auth, db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Card, Loading } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";

const Jobs = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    async function getJobs() {
        try {
            let jobsRef = collection(db, 'user-jobs');
            let q = query(jobsRef, where('user_id', '==', firebase_user.uid));
            onSnapshot(q, (docs) => {
                setJobs([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setJobs(prev => [...prev, newData]);
                });
            })

            setLoadingJobs(false);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getJobs();
    }, []);


    return (
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold mb-2">Jobs</h1>
                <p className="text-sm">CareerCrafter: Sculpting Your Professional Pathway</p>
            </div>
            <div className="p-8 absolute top-[26%] w-full">

            {
                loadingJobs ? 
                <div className="flex justify-center items-center flex-col gap-10 w-full h-[50vh] bg-slate-100 border border-slate-500 rounded-lg">
                    <Loading />
                    <p>Getting jobs ready, hold on!</p>
                </div> :
                (jobs.length == 0 && loadingJobs== false) ?  
                <div className="flex justify-center items-center flex-col gap-10 w-full h-[50vh] bg-slate-100 border border-slate-500 rounded-lg">
                
                <p>Your jobs will appear here</p>
            </div>:
                <div className="w-full bg-slate-100 border border-slate-500 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 p-6">
                    {jobs.map((job, index) => (
                        <Card className=" bg-white border border-slate-200" key={index}>
                            <Card.Body>
                                <h3 className="font-bold text-base text-green-900">{job.title}</h3>
                                <p className="text-xs">
                                    {job.description}
                                </p>
                                <a href={job.link}><Button color="success" size="sm">
                                    Apply
                                </Button></a>
                            </Card.Body>
                        </Card>
                    ))}
                    </div>
                </div>
            }
        </div>
        </div>
    );
}

export default Jobs;