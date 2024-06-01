'use client'
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";


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
            refrences.length > 0 ?
            <div className="mb-10">
                <p className="text-violet-900 font-bold">References</p>
                <div className="flex gap-10 flex-wrap">
                    {refrences.map((refrence, index) => (
                            <div className="text-xs" key={index}>
                                <p className="text-[8px] md:text-xs lg:text-sm font-semibold mb-2 md:mb-2 lg:mb-2">{refrence.referee_name}</p>
                                <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{refrence.organization}</p>
                                <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{refrence.role}</p>
                                <p className="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">{refrence.email}</p>
                                <p className="text-[6px] md:text-[8px] lg:text-xs">{refrence.phone}</p>
                            </div>
                    ))}
                </div>
            </div> : <div></div>
            }

        </div>

    );
}

export default References;