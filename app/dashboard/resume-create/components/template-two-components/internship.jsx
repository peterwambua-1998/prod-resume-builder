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
                    internships.map((internship, index) => (
                        <div className="p-2 md:p-5 lg:p-5" key={index}>
                            <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Internship Work</p>
                            <div className="flex  text-black">
                                <div className="mb-8 ">
                                    <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">{internship.organization}, {internship.role}</p>
                                    <p className="text-[3px] md:text-sm lg:text-sm mb-2">{internship.duration} month(s)</p>
                                    <div className="text-[5px] md:text-sm lg:text-sm">
                                        <p>{internship.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : <div></div>
                }
                
            </div>
            
    );
}
 
export default Internship;