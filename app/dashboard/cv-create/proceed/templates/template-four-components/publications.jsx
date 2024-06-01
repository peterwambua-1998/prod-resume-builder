'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { Input } from "postcss";
import { useState, useEffect } from "react";
import { Accordion, Modal } from "react-daisyui";

const Publications = ({ userId }) => {
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
            <div className="mb-10">
            <p className="text-violet-900 font-bold">Publications</p>
             {publications.map((publication, index) => (
                    <div className="mt-2 mb-2" key={index}>
                        <p className="text-base font-semibold">{publication.title}</p>
                        <p className="text-sm text-[#475569]"> {publication.link}</p>
                    </div>
                ))}
        </div>
        : <div></div>
            }

        </div>
        
    );
}

export default Publications;