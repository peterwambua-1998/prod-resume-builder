'use client'

import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Divider } from "react-daisyui";

const Internship = ({ userId }) => {
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
    }, []);


    return (
        <div>
            {
                internships.length > 0 ? <p className="mb-2 font-bold">Internship Work</p> : <div></div>
            }

            {
                internships.length > 0 ?
                    <div>
                        {internships.map((internship, index) => (
                            <div>
                                <div className="mb-8" >
                                    <p className="text-amber-600 font-bold mb-2 text-lg">{internship.organization}, {internship.role}</p>
                                    <p className="text-sm mb-2">{internship.duration} month(s)</p>
                                    <div className="pl-3">
                                        <ul style={{ listStyleType: 'disc' }}>
                                            <li>{internship.description}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}<Divider></Divider></div> : <div></div>
            }

        </div>
    );
}

export default Internship;