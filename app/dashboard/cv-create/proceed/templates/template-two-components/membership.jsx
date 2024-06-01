'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Badge, Button } from "react-daisyui";

const Memberships = ({userId}) => {
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
        <div>
            {
                memberships.length > 0 ?
                <div className="mb-5 p-2">
                    <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Memberships</p>
                    <div className="flex justify-start mt-3">
                        <ul style={{ listStyleType: 'disc' }} className="text-[5px] md:text-base lg:text-base pl-5 pr-5">
                            {memberships.map((membership, index) => (
                                <li key={index}>{membership.organization}</li>
                            ))}
                        </ul>
                    </div>
                
                </div>: <div></div>
            }
        </div>
    );
}
 
export default Memberships;