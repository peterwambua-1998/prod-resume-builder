'use client'
import { useEffect, useState } from "react";
import { Badge, Divider, Skeleton } from "react-daisyui";
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
                    <div>
                        <p className="mb-2 font-bold">Hobbies</p>
                        <div className="flex gap-4 flex-wrap">
                            {hobbies.map((hobby, index) => (
                                <Badge className="p-4 bg-amber-600 text-black" key={index}>{hobby.title}</Badge>
                            ))}
                        </div>
                        <Divider></Divider>
                    </div>
                    : <div></div>
            }
        </div>
    );



}

export default Hobbies;