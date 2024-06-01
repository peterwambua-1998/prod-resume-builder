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
            publications.map((publication, index) => (
                <div className="p-2 md:p-5 lg:p-5" key={index}>
                    <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Publications</p>
                    <div className="flex  text-black">
                        <div className="mb-8 ">
                            <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">{publication.title}</p>
                            <div className="text-[5px] md:text-sm lg:text-sm">
                                <p>{publication.link}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            : ''
        }
        
    </div>
    );
}
 
export default Publications;