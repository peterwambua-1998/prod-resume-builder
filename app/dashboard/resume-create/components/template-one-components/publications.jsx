'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { Input } from "postcss";
import { useState, useEffect } from "react";

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
                publications.length > 0 ? <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Publications</p> : <div></div>
            }
            {
                publications.length > 0 ?
                publications.map((publication, index) => (
                    <div className="mt-5" key={index}>
                        <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">{publication.title}</p>
                        <div className="pl-3">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="text-[5%] md:text-sm lg:text-sm">{publication.link}</li>
                            </ul>
                        </div>
                    </div>
                )): <div></div>
            }
        </div>
    );
}
 
export default Publications;