'use client'
import { useEffect, useState } from "react";
import { Input,Textarea, Accordion, Badge, Button } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc, setDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase/firebase";

const Address = ({userId}) => {
    const [address, setAddress] = useState(null);
    const [addressValue, setAddressValue] = useState(null);

    async function getAddress() {
        try {
            const usb = onSnapshot(doc(db, 'address', userId), doc => {
                if (doc.exists()) {
                    setAddress(doc.data());
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    async function addAddress() {
        try {
            let data = {
                value: addressValue,
                created_at: Timestamp.now()
            }
            await setDoc(doc(db, "address", userId), data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAddress();
    }, [])
    

    return (  
        <div>
             <Accordion className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    Address
                </Accordion.Title>
                <Accordion.Content>
                        <div className="flex gap-2 mb-2 items-center">
                            <div>
                                <Badge className="p-4">{address != null ? address.value : 'add address it is requied'}</Badge>
                            </div>
                        </div>
                        
                        <div className="form-control w-full grow">
                            <label className="label">
                                <span className="label-text">Add Address</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Ex: Nairobi, Kenya" onChange={(e) => setAddressValue(e.target.value)} />
                                <Button onClick={() => {addAddress()}}>Save</Button>
                            </div>
                        </div>
                        
                </Accordion.Content>
            </Accordion>
        </div>
    );
}
 
export default Address;