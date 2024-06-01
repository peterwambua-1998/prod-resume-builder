'use client'
import { useEffect, useState } from "react";
import { Badge, Skeleton } from "react-daisyui";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const Hobbies = ({ userId }) => {
    const [hobbies, setHoobbies] = useState([]);

    function getHobbies() {
        try {
            let hobbiesRef = collection(db, 'hobbies');
            let q = query(hobbiesRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setHoobbies([]);
                docs.forEach(doc => {
                    setHoobbies(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHobbies();
    }, []);


    return (
        <div>
            {
                hobbies.length > 0 ?
                    <div className="mb-10">
                        <p className="text-violet-900 font-bold">Hobbies</p>
                        <div className="flex gap-2 flex-wrap text-sm">
                     {hobbies.map((hobby, index) => (
                            <span key={index} className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">{hobby.title}</span>
                            ))}
                        </div>
                    </div>
                    : <span></span>
            }
        </div>

    );


}

export default Hobbies;