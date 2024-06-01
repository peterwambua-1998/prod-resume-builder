'use client'
import { useEffect, useState } from "react";
import { Input,Textarea, Accordion, Badge, Button, Card } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase/firebase";

const Award = ({userId}) => {
    console.log(userId);
    const [awards, setAwards] = useState([]);
    const [awardValue, setAwardValue] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);

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
        try {
            const data = {
                user_id: userId,
                award: awardValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }
            
            const collectionRef =  collection(db, 'award');
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
            <Accordion className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    Awards
                </Accordion.Title>
                <Accordion.Content>
                        <div className="md:grid md:grid-cols-2 gap-2 mb-2 items-center">
                            {awards.map((award, index) => (
                                <div key={index}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title tag="h2">{award.award}</Card.Title>
                                            <p>{award.description}</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                                
                            ))}
                        </div>
                        
                        <div className="form-control w-full grow">
                            <label className="label">
                                <span className="label-text">Add Award</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Title" onChange={(e) => setAwardValue(e.target.value)} />
                                <Input className="bg-white text-black grow" placeholder="Description" onChange={(e) => setDescriptionValue(e.target.value)} />
                                <Button onClick={() => {addAward()}}>Save</Button>
                            </div>
                        </div>
                        
                </Accordion.Content>
            </Accordion>
        </div>
    );
}
 
export default Award;