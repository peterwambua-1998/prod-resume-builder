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
            {
            internships.length > 0 ?
                <div className="mb-10">
                <p className="text-violet-900 font-bold">Internship Work</p>
                    {(internships.map((internship, index) => (
                        <div className="mt-2 mb-2" key={index}>
                            <p className="text-lg font-semibold">{internship.role} <span className="text-[#808080]">@ {internship.organization}</span></p>
                            <p className="text-sm font-semibold text-[#475569]">{internship.duration} month(s)</p>
                            <p className="text-sm"> {internship.description}</p>
                        </div>
                    )))} 
                </div> 
                : 
                <div></div>
            }

        </div>
    );
}
 
export default Internship;