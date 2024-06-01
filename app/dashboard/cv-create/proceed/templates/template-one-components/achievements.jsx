'use client'
import { useEffect, useState } from "react";
import { Input, Button, Card, Modal } from "react-daisyui";
import { collection, query, where, onSnapshot, Timestamp, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

const Award = ({ userId }) => {
    const [visibleEdu, setVisibleEdu] = useState(false);

    const [awards, setAwards] = useState([]);
    const [awardValue, setAwardValue] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);

    const [titleError, setTitleError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);

    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

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


    async function addAward() {
        if (!awardValue || awardValue == null) {
            setTitleError('field required');
        } else {
            setTitleError('');
        }

        if (!descriptionValue || descriptionValue == null) {
            setDescriptionError('field required');
        } else {
            setDescriptionError('');
        }

        try {
            const data = {
                user_id: userId,
                award: awardValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }

            const collectionRef = collection(db, 'award');
            const res = await addDoc(collectionRef, data);
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
                awards.length > 0 ? <div className="bg-indigo-950 ">
                    <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Awards</p>
                </div> : ''
            }
            
            {
                awards.length > 0 ? (awards.map((award, index) => (

                    <div className="flex text-black" key={index}>
                        <div className="mb-2 p-2 md:p-5 lg:p-5">
                            <p className="text-blue-600 text-[6px] md:text-base lg:text-base font-bold mb-2">{award.award}</p>
                            <div className=" md:pl-3 lg:pl-3 text-[5px] md:text-sm lg:text-sm">
                                <p>{award.description}</p>
                            </div>
                        </div>
                    </div>
                ))) : (<div></div>)
            }

        </div>
    );
}

export default Award;