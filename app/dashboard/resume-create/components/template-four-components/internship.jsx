'use client'

import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Internship = ({userId}) => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    const [internships, setInternships] = useState([]);

    function getInternships() {
        try {
            let internshipRef = collection(db, 'internships_volunteer_work');
            let q = query(internshipRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setInternships([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setInternships(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInternships();
    },[]);

    
    return (  
        <div>
            <div className="md:grid md:grid-cols-5 mt-10">
                <div className="col-span-1 pl-2 mb-5">
                </div>
                <div className="col-span-4 pl-10 mb-5">
                    <p className="font-bold text-lg  border-b">Internship Work</p>
                </div>
            </div>
                    
                {
                internships.length > 0 ? (internships.map((internship, index) => (
                    <div className="md:grid md:grid-cols-5 mt-2" key={index}>
                        <div className="col-span-1 pl-2 text-right mb-6">
                            <p>{internship.role}</p>
                            <p className="text-xs text-[#808080]">{internship.duration} month(s)</p>
                        </div>
                        <div className="col-span-4 pl-10 mb-6">
                            <p>{internship.organization}</p>
                            <p className="text-sm text-[#808080]">{internship.description}</p>
                        </div>
                    </div>
                ))) : <div></div>
                }

        </div>  
    );
}
 
export default Internship;