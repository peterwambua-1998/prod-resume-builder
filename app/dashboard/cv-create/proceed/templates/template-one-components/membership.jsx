'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Badge, Button } from "react-daisyui";

const Memberships = ({ userId }) => {
    const [memberships, setMemberships] = useState([]);

    function getMemberships() {
        try {
            let membershipRef = collection(db, 'memberships');
            let q = query(membershipRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setMemberships([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setMemberships(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getMemberships();
    }, []);


    return (
        <div className="mb-5">
            {
                memberships.length > 0 ?
                    <div >
                        <div className="bg-indigo-950 ">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Memberships</p>
                        </div>
                        <div className="flex justify-center text-black pt-2">
                            <ul style={{ listStyleType: 'disc' }} className="text-black pl-10 pr-10 ">
                                {memberships.map((membership, index) => (
                                    <li key={index}>{membership.organization}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    : <div></div>
            }
        </div>
    );
}

export default Memberships;