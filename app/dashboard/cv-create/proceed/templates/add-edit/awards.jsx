'use client'
import { useEffect, useState } from "react";
import { Input, Textarea, Accordion, Badge, Button, Card, Modal, Loading } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const AwardAddEdit = ({ userId }) => {
    var [awards, setAwards] = useState([]);
    var [awardValue, setAwardValue] = useState(null);
    var [descriptionValue, setDescriptionValue] = useState(null);
    var [visibleEdu, setVisibleEdu] = useState(false);
    var [visibleEdit, setVisibleEdit] = useState(false);
    var [titleError, setTitleError] = useState(null);
    var [descriptionError, setDescriptionError] = useState(null);
    var [selectedRecord, setSelectedRecord] = useState(null);

    var [visibleDelete, setVisibleDelete] = useState(false);
    var [selectedRecordDelete, setSelectedRecordDelete] = useState(null);
    var [loadingDelete, setLoadingDelete] = useState(false);

    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
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

    const toggleVisibleDelete = (record) => {
        setVisibleDelete(!visibleDelete);
        if (record) {
            setSelectedRecordDelete(record);
        } else {
            setSelectedRecordDelete(null);
        }
    };

    function addRespRecords(data) {
        if (data) {
            setAwardValue(data.award);
            setDescriptionValue(data.description);
        }
    }


    async function saveEditDetails(recordId) {
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
            let data = {
                user_id: userId,
                award: awardValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }

            await updateDoc(doc(db, "award", recordId), data);

            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }


    function getAwards() {
        try {
            let awardsRef = collection(db, 'award');
            let q = query(awardsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setAwards([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setAwards(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    async function addAward() {
        if (!awardValue || awardValue == null) {
            setTitleError('field required');
            return;
        } else {
            setTitleError('');
        }

        if (!descriptionValue || descriptionValue == null) {
            setDescriptionError('field required');
            return;
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
            toggleVisibleEdu();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecord() {
        try {
            setLoadingDelete(true);
            await deleteDoc(doc(db, 'award', selectedRecordDelete.id));
            toggleVisibleDelete(null);
            setLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAwards();
    }, []);

    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title >
                    <p className="text-base font-semibold">Awards</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className=" mb-2 ">
                        {awards.map((award, index) => (
                            <div key={index} className="mb-2">
                                <Badge className="w-fit p-4">
                                    {award.award}
                                    <FontAwesomeIcon className="pl-3 pr-3 hover:cursor-pointer" onClick={() => toggleVisibleEdit(award)} icon={faPencilAlt} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => toggleVisibleDelete(award)} className="hover:cursor-pointer" />
                                </Badge>
                            </div>
                        ))}
                    </div>

                    <div className="form-control w-full grow">
                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-amber-200 border-amber-500 text-black" onClick={() => { toggleVisibleEdu() }}>Add</Button>
                        </div>
                    </div>

                </Accordion.Content>
            </Accordion>

            {
                selectedRecordDelete ? (
                    <Modal.Legacy open={visibleDelete} className="bg-white">
                        <Modal.Header className="font-bold text-base">Delete Experience</Modal.Header>
                        <Modal.Body className="p-0">
                            <p>Delete award {selectedRecordDelete.award}</p>
                        </Modal.Body>
                        <Modal.Actions>
                            <Button type="button" onClick={toggleVisibleDelete} >Close</Button>
                            <Button type="button" onClick={deleteRecord} className="bg-[#fca5a5] border-red-600 text-black">
                                {
                                    loadingDelete ? <Loading /> : ""
                                }
                                Delete
                            </Button>
                        </Modal.Actions>
                    </Modal.Legacy>
                ) : <div></div>
            }

            {selectedRecord ?
                <Modal.Legacy open={visibleEdit} className="bg-white max-w-5xl">
                    <form>
                        <Modal.Header className="font-bold">Award</Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="md:grid grid-cols-2 gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="">Title</span>
                                    </label>
                                    <div>
                                        <Input defaultValue={selectedRecord.award ? selectedRecord.award : ''} className="bg-white text-black w-full" placeholder="Title" onChange={(e) => setAwardValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{titleError}</div>
                                    </div>
                                </div>
                                <div className="form-control w-full grow">
                                    <label className="label">
                                        <span className="">Description</span>
                                    </label>
                                    <div>
                                        <Input defaultValue={selectedRecord.description ? selectedRecord.description : ''} className="bg-white text-black w-full" placeholder="Description" onChange={(e) => setDescriptionValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{descriptionError}</div>
                                    </div>
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

            <Modal.Legacy open={visibleEdu} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Award</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="md:grid grid-cols-2 gap-4">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="">Title</span>
                                </label>
                                <div>
                                    <Input className="bg-white text-black w-full" placeholder="Title" onChange={(e) => setAwardValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{titleError}</div>
                                </div>
                            </div>
                            <div className="form-control w-full grow">
                                <label className="label">
                                    <span className="">Description</span>
                                </label>
                                <div>
                                    <Input className="bg-white text-black w-full" placeholder="Description" onChange={(e) => setDescriptionValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{descriptionError}</div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => { addAward() }}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default AwardAddEdit;