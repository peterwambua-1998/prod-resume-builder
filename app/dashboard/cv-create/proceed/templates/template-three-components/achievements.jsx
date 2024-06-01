'use client'
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, Timestamp, addDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase/firebase";
import { Divider } from "react-daisyui";

const Award = ({userId}) => {
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
                <div>
                <p className="mb-2 font-bold">Awards</p>
                    {awards.map((award, index) => (
                        <div className="mb-8" key={index}>
                            <p className="text-amber-600 font-bold mb-2 text-lg">{award.award}</p>
                            <div className="pl-3 text-sm">
                                <ul style={{ listStyleType: 'disc' }}>
                                    <li>{award.description}</li>
                                </ul>
                            </div>
                            
                        </div>
                    
                    ))}
                <Divider></Divider>
                </div> : <div></div>
            }
        </div>
    );
}
 
export default Award;