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

            {/* <Accordion className="bg-black text-white">
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
                                
                                <Button onClick={() => {addAward()}}>Save</Button>
                            </div>
                        </div>
                        
                </Accordion.Content>
            </Accordion> */}
            <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Awards</p>

            {
                awards.length > 0 ? (awards.map((award, index) => (
                    <div key={index}>
                        <div className="mt-3">
                            <p className="text-[7px] md:text-base lg:text-base">{award.award}</p>
                            <p className="text-[5px] md:text-sm lg:text-sm">{award.description}</p>
                        </div>
                    </div>
                   
                ))) : (<div className="text-[#808080] text-sm p-2 md:p-5 lg:p-5">You currently have no awards</div>)
            }


            {/* <Modal.Legacy open={visibleEdu} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Award</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="md:grid grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="">Title</span>
                                </label>
                                <div>
                                    <Input className="bg-white text-black grow" placeholder="Title" onChange={(e) => setAwardValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{titleError}</div>
                                </div>
                            </div>
                            <div className="form-control w-full grow">
                                <label className="label">
                                    <span className="">Description</span>
                                </label>
                                <div>
                                    <Input className="bg-white text-black grow" placeholder="Description" onChange={(e) => setDescriptionValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{descriptionError}</div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => {addReferences()}}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy> */}
        </div>
    );
}
 
export default Award;