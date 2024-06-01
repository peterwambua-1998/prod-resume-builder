'use client'
import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Internship = ({userId}) => {
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
            <div>
            {
                internships.length > 0 ? <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Internship Work</p> : <div></div>
            }
            {
                internships.length > 0 ?
                internships.map((internship, index) => (
                    <div className="mt-5" key={index}>
                        <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">{internship.organization}, {internship.role}</p>
                        <p className="text-[2%] md:text-sm lg:text-sm mb-2">{internship.duration} month(s)</p>
                        <div className="pl-3">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="text-[5%] md:text-sm lg:text-sm">{internship.description}</li>
                            </ul>
                        </div>
                    </div>
                )): <div></div>
            }
            </div>
        </div>
    );
}
 
export default Internship;