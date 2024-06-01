'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { Input } from "postcss";
import { useState, useEffect } from "react";
import { Accordion, Modal } from "react-daisyui";

const Publications = ({userId}) => {
    const [publications, setPublications] = useState([]);
    
    function getPublications() {
        try {
            let publicationsRef = collection(db, 'publications');
            let q = query(publicationsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setPublications([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setPublications(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getPublications();
    }, []);

    return (  
        <div>
            {
                publications.length > 0 ? 
                <div className="mt-8">
                    <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Publications</p>
                    {publications.map((publication, index) => (
                        <div className="pr-2 pl-2 md:pl-4 md:pr-4" key={index}>
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">{publication.title}</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                {publication.link}
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
 
export default Publications;