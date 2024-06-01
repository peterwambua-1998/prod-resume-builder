'use client'
import { useEffect, useState } from "react";
import { Input, Button, Card, Modal } from "react-daisyui";
import { collection, query, where, onSnapshot, Timestamp, addDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase/firebase";

const Award = ({userId}) => {
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

    useEffect(() => {
        getAwards();
    }, []);

    return ( 
        <div>
            <div className="md:grid md:grid-cols-5 mt-10">
                <div className="col-span-1 pl-2 mb-5">
                </div>
                <div className="col-span-4 pl-10 mb-5">
                    <p className="font-bold text-lg  border-b">Awards</p>
                </div>
            </div>
                    
                {
                awards.length > 0 ? (awards.map((award, index) => (
                    <div className="md:grid md:grid-cols-5 mt-2" key={index}>
                        <div className="col-span-1 pl-2 text-right mb-6" >
                            <p>{award.award}</p>
                        </div>
                        <div className="col-span-4 pl-10 mb-6">
                            <p className="text-sm text-[#808080]">{award.description}</p>
                        </div>
                    </div>
                ))) : (
                    <div className="md:grid md:grid-cols-5 mt-2" >
                        <div className="col-span-1 pl-2 text-right mb-6" >
                            <p></p>
                        </div>
                        <div className="col-span-4 pl-10 mb-6">
                            <p className="text-sm text-[#808080]">You currently have no awards data</p>
                        </div>
                    </div>
                )
                }

            </div>  
    );
}
 
export default Award;