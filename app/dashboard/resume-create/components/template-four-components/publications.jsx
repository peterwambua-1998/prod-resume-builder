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
                <div>
                <div className="md:grid md:grid-cols-5 mt-10">
                    <div className="col-span-1 pl-2 mb-5">
                    </div>
                    <div className="col-span-4 pl-10 mb-5">
                        <p className="font-bold text-lg  border-b">Publications</p>
                    </div>
                </div>
                    
                { (publications.map((publication, index) => (
                    <div className="md:grid md:grid-cols-5 mt-2" key={index}>
                        <div className="col-span-1 pl-2 text-right mb-6">
                            <p>{publication.title}</p>
                        </div>
                        <div className="col-span-4 pl-10 mb-6">
                            <p className="text-sm text-[#808080]">{publication.link}</p>
                        </div>
                    </div>
                )))}</div> : <div></div>
            }

        </div> 
    );
}
 
export default Publications;