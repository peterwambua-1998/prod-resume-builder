'use client'
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const Award = ({ userId }) => {

    const [awards, setAwards] = useState([]);


    function getAwards() {
        try {
            let awardsRef = collection(db, 'award');
            let q = query(awardsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setAwards([]);
                docs.forEach(doc => {
                    setAwards(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAwards();
    }, []);

    return (
        <div>


            {
                awards.length > 0 ?
                    <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Awards</p>
                    : <p></p>
            }

            {
                awards.length > 0 ? (awards.map((award, index) => (
                    <div key={index}>
                        <div className="mt-3">
                            <p className="text-[7px] font-semibold md:text-base lg:text-base pl-5 pr-5">{award.award}</p>
                            <p className="text-[5px] md:text-sm lg:text-sm pl-5 pr-5">{award.description}</p>
                        </div>
                    </div>

                ))) : <div></div>
            }

        </div>
    );
}

export default Award;