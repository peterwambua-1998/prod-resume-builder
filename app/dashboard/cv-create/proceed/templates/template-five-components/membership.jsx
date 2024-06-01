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
                    <div className="md:mt-10 md:pl-2 md:pr-2 lg:mt-10 lg:pl-4 lg:pr-4">
                    <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 lg:pb-2 border-[#808080] md:mb-5 lg:mb-5">Memberships</p>
                    {memberships.map((membership, index) => (
                        // <li key={index}>{lang.name} (lang.description)</li>
                        <div className="md:pl-2 md:pr-2 lg:pl-8 lg:pr-8 md:mb-5 flex gap-2" key={index}>
                            <p className="font-semibold text-[5px] md:text-xs mb-2">{membership.organization}</p>
                        </div>
                    ))}
                </div>: <div></div>
            }
        </div>
    );
}
 
export default Memberships;