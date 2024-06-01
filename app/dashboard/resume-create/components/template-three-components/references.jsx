'use client'
import { useEffect, useState } from "react";
import { Input, Button, Modal } from "react-daisyui";
import { collection, query, where, onSnapshot, Timestamp, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const References = ({ userId }) => {
    const [refrences, setRefrences] = useState([]);

    function getReferences() {
        try {
            let referencesRef = collection(db, 'references');
            let q = query(referencesRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setRefrences([]);
                docs.forEach(doc => {
                    setRefrences(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getReferences();
    }, []);

    return (
        
        <div>
            {
            refrences.length >0 ?
            <div>
            <p className="mb-2 font-bold mt-8">References</p>
                <div className="md:flex md:gap-20">
                {refrences.map((refrence, index) => (
                    <div key={index}>
                        <div className="text-sm">
                            <p className="font-bold text-amber-500">{refrence.referee_name}</p>
                            <p>{refrence.organization}</p>
                            <p>{refrence.role}</p>
                            <p>{refrence.email}</p>
                            <p>{refrence.phone}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
           : <div className=" mb-5"></div>
        }
            
        </div>
    );
}

export default References;