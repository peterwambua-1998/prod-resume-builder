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

                <div className="md:grid md:grid-cols-5 mt-5">
                <div className="col-span-1 pl-2 mb-5">
                </div>
                <div className="col-span-4 pl-10 mb-5">
                    <p className="font-bold text-lg  border-b">Hobbies</p>
                </div>

                <div className="col-span-1 pl-2 text-right">
                    <p></p>
                    <p className="text-xs text-[#808080]"></p>
                </div>
                <div className="col-span-4 pl-10 mb-6">
                    <div className="md:flex flex-wrap  md:gap-4">
                    {hobbies.length > 0 ? (hobbies.map((hobby, index) => (
                        <div key={index}>
                            <div><Badge className="p-4 bg-cyan-400 text-black">{hobby.title}</Badge></div>
                        </div>
                        ))): (<div className="text-[#808080] p-4">You currently have no education data</div>)
                    }
                    </div>
                </div>
            </div>
            </div>
        );


}

export default Hobbies;