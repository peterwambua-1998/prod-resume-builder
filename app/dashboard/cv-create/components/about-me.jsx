'use client'
import { useEffect, useState } from "react";
import { Input,Textarea, Accordion, Badge, Button } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc, setDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase/firebase";

const AboutMe = ({userId}) => {
    const [about, setAbout] = useState(null);
    const [aboutValue, setAboutValue] = useState(null);

    async function getAbout() {
        console.log('about user id' == userId);
        // try {
        //     onSnapshot(doc(db, 'about', userId), doc => {
        //         setAbout(doc.data());
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }


    async function addAboutMe() {
        try {
            let data = {
                description: aboutValue,
                created_at: Timestamp.now()
            }
            await setDoc(doc(db, "about", userId), data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAbout();
        console.log(userId);
    }, [])
    

    return (  
        <div>
             <Accordion className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    About Me
                </Accordion.Title>
                <Accordion.Content>
                        <div className="flex gap-2 mb-2 items-center">
                            <div>
                                <Badge className="p-4">{about != null ? about.description : ''}</Badge>
                            </div>
                        </div>
                        
                        <div className="form-control w-full grow">
                            <label className="label">
                                <span className="label-text">Add About me</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Ex: about me" onChange={(e) => setAboutValue(e.target.value)} />
                                <Button onClick={() => {addAboutMe()}}>Save</Button>
                            </div>
                        </div>
                        
                </Accordion.Content>
            </Accordion>
        </div>
    );
}
 
export default AboutMe;