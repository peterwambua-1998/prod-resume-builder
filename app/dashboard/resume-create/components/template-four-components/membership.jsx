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
        <div className="">
            {
                memberships.length > 0 ?
                <div>
                <div className="md:grid md:grid-cols-5 mt-5">
                    <div className="col-span-1 pl-2 mb-5">
                    </div>
                <div className="col-span-4 pl-10 mb-5">
                    <p className="font-bold text-lg  border-b">Memberships</p>
                </div>

                <div className="col-span-1 pl-2 text-right">
                    <p></p>
                    <p className="text-xs text-[#808080]"></p>
                </div>
                <div className="col-span-4 pl-10 mb-6">
                    <div className="md:flex flex-wrap  md:gap-4">
                    {(memberships.map((membership, index) => (
                        <div key={index}>
                            <div><Badge className="p-4 bg-cyan-400 text-black">{membership.organization}</Badge></div>
                        </div>
                        )))
                    }
                    </div>
                </div>
                </div>
            </div>: <div></div>
            }
            
        </div>
    );
}
 
export default Memberships;