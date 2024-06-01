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
        <div>
            {
            memberships.length > 0 ?
            <div className="mb-10">
                <p className="text-violet-900 font-bold">Memberships</p>
                <div className="flex gap-2 flex-wrap text-sm">
                     {memberships.map((membership, index) => (
                            <span key={index} className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">{membership.organization}</span>
                        )) }

                </div>
            </div>
            : 
            <span></span>
            }

        </div>

    );
}

export default Memberships;