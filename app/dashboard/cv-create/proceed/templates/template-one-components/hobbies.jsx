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


    return (
        <div className="mb-5">
            {
                hobbies.length > 0 ?
                    <div>
                        <div className="bg-indigo-950 ">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Hobbies</p>
                        </div>
                        <div className="flex justify-center text-black pt-2">
                            <ul style={{ listStyleType: 'disc' }} className="text-black pl-10 pr-10 ">
                                {hobbies.map((hobby, index) => (
                                    <li key={index}>{hobby.title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    : <div></div>
            }

        </div>
    );


}

export default Hobbies;