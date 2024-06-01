'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Divider } from "react-daisyui";

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
                <div>
                    <p className="mb-2 font-bold">Memberships</p>
                    <div className="flex gap-4">
                        {memberships.map((membership, index) => (
                        <Badge className="p-4 bg-amber-600 text-black" key={index}>{membership.organization}</Badge>
                        ))}
                    </div>
                    <Divider></Divider>
                </div>
                : <div></div>
            }
        </div>
    );
}
 
export default Memberships;