'use client'
import { useEffect, useState } from "react";
import { Skeleton } from "react-daisyui";
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

    if (hobbies.length < 1) {
        return (
            <div className="text-[#808080] pl-5 pr-5 pt-5">You currently have no hobbies saved</div>
        )
    } else {
        return (
            <div>
                <div className="flex justify-center text-black">
                    <ul style={{ listStyleType: 'disc' }} className="text-black pl-10 pr-10 ">
                        {hobbies.map((hobby, index) => (
                            <li key={index}>{hobby.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }


}

export default Hobbies;