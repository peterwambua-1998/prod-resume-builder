'use client'
import { useEffect, useState } from "react";
import { Input, Accordion, Modal, Button, Badge } from "react-daisyui";
import { collection, Timestamp, addDoc, updateDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const HobbiesAddEdit = ({ userId }) => {
    var [hobbies, setHoobbies] = useState([]);
    var [hobbbyValue, setHobbyValue] = useState(null);
    var [hobbbyError, setHobbyError] = useState(null);
    var [visible, setVisible] = useState(false);
    var [visibleEdit, setVisibleEdit] = useState(false);

    var [selectedRecord, setSelectedRecord] = useState(null);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    const toggleVisibleEdit = (record) => {
        setVisibleEdit(!visibleEdit);
        if (record) {
            addRespRecords(record);
            setSelectedRecord(record);
        } else {
            setSelectedRecord(null);
        }
    };

    function addRespRecords(data) {
        if (data) {
            setHobbyValue(data.title);
        }
    }

    async function addHobby() {
        if (!hobbbyValue || hobbbyValue == null) {
            setHobbyError('field required');
            return;
        } else {
            setHobbyError(null);
        }

        try {
            const data = {
                user_id: userId,
                title: hobbbyValue,
                created_at: Timestamp.now()
            }

            const collectionRef = collection(db, 'hobbies');
            const res = await addDoc(collectionRef, data);
            toggleVisible();
        } catch (error) {
            console.log(error);
        }
    }

    function getHobbies() {
        try {
            let hobbiesRef = collection(db, 'hobbies');
            let q = query(hobbiesRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setHoobbies([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setHoobbies(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function saveEditDetails(recordId) {
        if (!hobbbyValue || hobbbyValue == null) {
            setHobbyError('field required');
            return;
        } else {
            setHobbyError(null);
        }

        try {
            let data = {
                user_id: userId,
                title: hobbbyValue,
                created_at: Timestamp.now()
            }

            await updateDoc(doc(db, "hobbies", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHobbies();
    }, []);

    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title>
                    <p className="text-base font-semibold">Hobbies</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className="flex flex-wrap gap-2 mb-2 items-center">
                        {hobbies.map((hobby, index) => (
                            <div key={index}>
                                <Badge className="p-4">{hobby.title} <FontAwesomeIcon className="pl-3 hover:cursor-pointer" onClick={() => toggleVisibleEdit(hobby)} icon={faPencilAlt} /></Badge>
                            </div>
                        ))}
                    </div>
                    <div className="form-control w-full grow">
                        <div className="flex gap-4">
                            <Button className="bg-amber-200 border-amber-500 text-black" onClick={() => { toggleVisible() }}>Add Hobby</Button>
                        </div>
                    </div>

                </Accordion.Content>
            </Accordion>

            {
                selectedRecord ?
                    <Modal.Legacy open={visibleEdit} className="bg-white max-w-5xl">
                        <form>
                            <Modal.Header className="font-bold text-black">Hobby</Modal.Header>
                            <Modal.Body className="p-0">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-black">Add Hobby</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <Input defaultValue={selectedRecord.title ? selectedRecord.title : ''} className="bg-white text-black grow" placeholder="Ex: singing" onChange={(e) => setHobbyValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{hobbbyError}</div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Actions>
                                <Button type="button" onClick={() => toggleVisibleEdit(null)} >Close</Button>
                                <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => saveEditDetails(selectedRecord.id)}>Save</Button>
                            </Modal.Actions>
                        </form>
                    </Modal.Legacy>
                    :
                    <div></div>
            }

            <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold text-black">Hobby</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Add Hobby</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Ex: singing" onChange={(e) => setHobbyValue(e.target.value)} />
                                <div className="text-red-600 text-sm">{hobbbyError}</div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisible} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => { addHobby() }}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default HobbiesAddEdit;