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
                <div className="mt-8">
                    <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Internship Work</p>
                    {internships.map((internship, index) => (
                        <div className="pr-2 pl-2 md:pl-4 md:pr-4" key={index}>
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">{internship.organization}, {internship.role}</p>
                                <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">{internship.duration} month(s)</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                {internship.description}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
                : <div></div>
            }
        </div>
    );
}
 
export default Internship;