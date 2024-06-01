'use client'
import { useEffect, useState } from "react";
import { Input,Textarea, Accordion, Badge, Button } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc, setDoc } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase/firebase";

const WebsiteLink = ({userId}) => {
    const [website, setwebsite] = useState(null);
    const [websiteValue, setWebsiteValue] = useState(null);

    async function getWebsite() {
        try {
            const usb = onSnapshot(doc(db, 'website', userId), doc => {
                if (doc.exists()) {
                    setwebsite(doc.data());
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    async function addWebsite() {
        try {
            let data = {
                link: websiteValue,
                created_at: Timestamp.now()
            }
            await setDoc(doc(db, "website", userId), data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWebsite();
    }, [])
    

    return (  
        <div>
             <Accordion className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    Webiste (optional)
                </Accordion.Title>
                <Accordion.Content>
                        <div className="flex gap-2 mb-2 items-center">
                            <div>
                                <Badge className="p-4">{website != null ? website.link : 'data not available and is optional'}</Badge>
                            </div>
                        </div>
                        
                        <div className="form-control w-full grow">
                            <label className="label">
                                <span className="label-text">Add Website</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Ex: https://google.com" onChange={(e) => setWebsiteValue(e.target.value)} />
                                <Button onClick={() => {addWebsite()}}>Save</Button>
                            </div>
                        </div>
                        
                </Accordion.Content>
            </Accordion>
        </div>
    );
}
 
export default WebsiteLink;