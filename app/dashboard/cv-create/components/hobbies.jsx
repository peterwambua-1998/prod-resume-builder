'use client'
import { useEffect, useState } from "react";
import { Input,Textarea, Accordion, Badge, Button } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase/firebase";


const Hobbies = ({userId}) => {
    console.log(userId);
    const [hobbies, setHoobbies] = useState([]);
    const [hobbbyValue, setHobbyValue] = useState(null);

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


    async function addHobby() {
        try {
            const data = {
                user_id: userId,
                title: hobbbyValue,
                created_at: Timestamp.now()
            }
            
            const collectionRef =  collection(db, 'hobbies');
            const res = await addDoc(collectionRef, data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHobbies();
    }, []);

    return (  
        <div>
            <Accordion defaultChecked className="bg-yellow-500 text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    Hobbies
                </Accordion.Title>
                <Accordion.Content>
                        <div className="flex gap-2 mb-2 items-center">
                            {hobbies.map((hobby, index) => (
                                <div key={index}>
                                    <Badge className="p-4">{hobby.title}</Badge>
                                </div>
                            ))}
                        </div>
                        
                        <div className="form-control w-full grow">
                            <label className="label">
                                <span className="label-text">Add Hobby</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Ex: singing" onChange={(e) => setHobbyValue(e.target.value)} />
                                <Button onClick={() => {addHobby()}}>Save</Button>
                            </div>
                        </div>
                        
                </Accordion.Content>
            </Accordion>
        </div>
    );
}
 
export default Hobbies;