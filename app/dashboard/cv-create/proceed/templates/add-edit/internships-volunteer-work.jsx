'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Modal, Input, Textarea, Loading } from "react-daisyui";

const Internship = ({ userId }) => {
    const [internships, setInternships] = useState([]);

    const [orgNameValue, setOrgNameValue] = useState(null);
    const [orgNameValueError, setOrgNameValueError] = useState(null);
    const [roleNameValue, setRoleNameValue] = useState(null);
    const [roleNameValueError, setRoleNameValueError] = useState(null);
    const [durationValue, setDurationValue] = useState(null);
    const [durationValueError, setDurationValueError] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);
    const [descriptionValueError, setDescriptionValueError] = useState(null);

    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedRecordDelete, setSelectedRecordDelete] = useState(null);

    // for deleting record
    const [loadingDelete, setLoadingDelete] = useState(false);

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
            setOrgNameValue(data.organization);
            setRoleNameValue(data.role);
            setDurationValue(data.duration);
            setDescriptionValue(data.description);
        }
    }


    async function saveEditDetails(recordId) {
        if (!orgNameValue || orgNameValue == null) {
            setOrgNameValueError('field required');
        } else {
            setOrgNameValueError('');
        }

        if (!roleNameValue || roleNameValue == null) {
            setRoleNameValueError('field required');
        } else {
            setRoleNameValueError('');
        }

        if (!durationValue || durationValue == null) {
            setDurationValueError('field required');
        } else {
            setDurationValueError('');
        }

        if (!descriptionValue || descriptionValue == null) {
            setDescriptionValueError('field required');
        } else {
            setDescriptionValueError('');
        }

        try {
            let data = {
                user_id: userId,
                organization: orgNameValue,
                role: roleNameValue,
                duration: durationValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }

            await updateDoc(doc(db, "internships_volunteer_work", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }

    function getInternships() {
        try {
            let internshipRef = collection(db, 'internships_volunteer_work');
            let q = query(internshipRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setInternships([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setInternships(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function addInternship() {
        if (!orgNameValue || orgNameValue == null) {
            setOrgNameValueError('field required');
        } else {
            setOrgNameValueError('');
        }

        if (!roleNameValue || roleNameValue == null) {
            setRoleNameValueError('field required');
        } else {
            setRoleNameValueError('');
        }

        if (!durationValue || durationValue == null) {
            setDurationValueError('field required');
        } else {
            setDurationValueError('');
        }

        if (!descriptionValue || descriptionValue == null) {
            setDescriptionValueError('field required');
        } else {
            setDescriptionValueError('');
        }

        try {
            let data = {
                user_id: userId,
                organization: orgNameValue,
                role: roleNameValue,
                duration: durationValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }

            const collectionRef = collection(db, 'internships_volunteer_work');
            await addDoc(collectionRef, data);
            toggleVisible();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecord() {
        try {
            setLoadingDelete(true);
            await deleteDoc(doc(db, 'internships_volunteer_work', selectedRecordDelete.id));
            toggleVisibleDelete(null);
            setLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInternships();
    }, []);

    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title >
                    <p className="text-base font-semibold">Internships</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className=" mb-2 ">
                        {internships.map((internship, index) => (
                            <div key={index} className="mb-2">
                                <Badge className="w-fit p-4">
                                    {internship.organization}
                                    <FontAwesomeIcon className="pl-3 pr-3 hover:cursor-pointer" onClick={() => toggleVisibleEdit(internship)} icon={faPencilAlt} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => toggleVisibleDelete(internship)} className="hover:cursor-pointer" />
                                </Badge>
                            </div>
                        ))}
                    </div>

                    <div className="form-control w-full grow">
                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-amber-200 border-amber-500 text-black" onClick={() => { toggleVisible() }}>Add</Button>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion>


            {
                selectedRecordDelete ? (
                    <Modal.Legacy open={visibleDelete} className="bg-white">
                        <Modal.Header className="font-bold text-base">Delete Internship Details</Modal.Header>
                        <Modal.Body className="p-0">
                            <p>Delete internship work at {selectedRecordDelete.organization}</p>
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
                        <Modal.Header className="font-bold">Internship</Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="md:grid grid-cols-3 gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="">Organization</span>
                                    </label>
                                    <div>
                                        <Input type="text" defaultValue={selectedRecord.organization ? selectedRecord.organization : ''} className="bg-white text-black w-full" placeholder="Ex: Safaricom" onChange={(e) => setOrgNameValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{orgNameValueError}</div>
                                    </div>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="">Role</span>
                                    </label>
                                    <div>
                                        <Input type="text" defaultValue={selectedRecord.role ? selectedRecord.role : ''} className="bg-white text-black w-full" placeholder="Ex: Coordinator" onChange={(e) => setRoleNameValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{roleNameValueError}</div>
                                    </div>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="">Duration (Months)</span>
                                    </label>
                                    <div>
                                        <Input type="number" defaultValue={selectedRecord.duration ? selectedRecord.duration : ''} className="bg-white text-black w-full" placeholder="Ex: 200" onChange={(e) => setDurationValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{durationValueError}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:grid grid-cols-1 gap-4">

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="">Description</span>
                                    </label>
                                    <div>
                                        <Textarea className="bg-white text-black w-full" defaultValue={selectedRecord.description ? selectedRecord.description : ''} placeholder="Ex: What you did" onChange={(e) => setDescriptionValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{descriptionValueError}</div>
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


            <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Internship Work</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="md:grid md:grid-cols-3 gap-4">
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="">Organization</span>
                                </label>
                                <div>
                                    <Input type="text" className="bg-white text-black grow w-full" placeholder="Ex: Safaricom" onChange={(e) => setOrgNameValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{orgNameValueError}</div>
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="">Role</span>
                                </label>
                                <div>
                                    <Input type="text" className="bg-white text-black w-full" placeholder="Ex: Coordinator" onChange={(e) => setRoleNameValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{roleNameValueError}</div>
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="">Duration (Months)</span>
                                </label>
                                <div>
                                    <Input type="number" className="bg-white text-black w-full" placeholder="Ex: 200" onChange={(e) => setDurationValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{durationValueError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="">Description</span>
                                </label>
                                <div>
                                    <Textarea className="bg-white text-black w-full" placeholder="Ex: What you did" onChange={(e) => setDescriptionValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{descriptionValueError}</div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisible} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => { addInternship() }}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default Internship;