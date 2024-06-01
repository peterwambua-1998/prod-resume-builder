'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Accordion, Badge, Button, Modal, Loading, Input } from "react-daisyui";


const Publications = ({ userId }) => {
    const [publications, setPublications] = useState([]);

    const [titleValue, setTitleValue] = useState(null);
    const [titleValueError, setTitleValueError] = useState(null);
    const [linkValue, setLinkValue] = useState(null);
    const [linkValueError, setLinkValueError] = useState(null);

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
            setTitleValue(data.title);
            setLinkValue(data.link);
        }
    }

    async function saveEditDetails(recordId) {
        if (!titleValue || titleValue == null) {
            setTitleValueError('field required');
        } else {
            setTitleValueError('');
        }

        if (!linkValue || linkValue == null) {
            ('field required');
        } else {
            setLinkValueError('');
        }


        try {
            let data = {
                user_id: userId,
                title: titleValue,
                link: linkValue,
                created_at: Timestamp.now()
            }

            await updateDoc(doc(db, "publications", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }


    function getPublications() {
        try {
            let publicationsRef = collection(db, 'publications');
            let q = query(publicationsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setPublications([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setPublications(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function addPublication() {
        if (!titleValue || titleValue == null) {
            setTitleValueError('field required');
        } else {
            setTitleValueError('');
        }

        if (!linkValue || linkValue == null) {
            setLinkValueError('field required');
        } else {
            setLinkValueError('');
        }

        try {
            let data = {
                user_id: userId,
                title: titleValue,
                link: linkValue,
                created_at: Timestamp.now()
            }

            const collectionRef = collection(db, 'publications');
            await addDoc(collectionRef, data);
            toggleVisible();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecord() {
        try {
            setLoadingDelete(true);
            await deleteDoc(doc(db, 'publications', selectedRecordDelete.id));
            toggleVisibleDelete(null);
            setLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPublications();
    }, []);

    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title >
                    <p className="text-base font-semibold">Publications</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className=" mb-2 ">
                        {publications.map((publication, index) => (
                            <div key={index} className="mb-2">
                                <Badge className="w-fit p-4">
                                    {publication.title}
                                    <FontAwesomeIcon className="pl-3 pr-3 hover:cursor-pointer" onClick={() => toggleVisibleEdit(publication)} icon={faPencilAlt} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => toggleVisibleDelete(publication)} className="hover:cursor-pointer" />
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
                        <Modal.Header className="font-bold text-base">Delete Publication Details</Modal.Header>
                        <Modal.Body className="p-0">
                            <p>Delete publication for {selectedRecordDelete.title}</p>
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
                        <Modal.Header className="font-bold">Publication</Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="md:grid grid-cols-2 gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="">Title</span>
                                    </label>
                                    <div>
                                        <Input type="text" defaultValue={selectedRecord.title ? selectedRecord.title : ''} className="bg-white text-black w-full" placeholder="Ex: Safaricom" onChange={(e) => setTitleValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{titleValueError}</div>
                                    </div>
                                </div>
                                <div className="form-control w-full grow">
                                    <label className="label">
                                        <span className="">Link</span>
                                    </label>
                                    <div>
                                        <Input type="text" defaultValue={selectedRecord.link ? selectedRecord.link : ''} className="bg-white text-black w-full" placeholder="Ex: Coordinator" onChange={(e) => setLinkValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{linkValueError}</div>
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
                    <Modal.Header className="font-bold">Publication</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="md:grid grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="">Title</span>
                                </label>
                                <div>
                                    <Input type="text" className="bg-white text-black w-full" placeholder="Ex: Publication" onChange={(e) => setTitleValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{titleValueError}</div>
                                </div>
                            </div>
                            <div className="form-control w-full grow">
                                <label className="label">
                                    <span className="">Link</span>
                                </label>
                                <div>
                                    <Input type="text" className="bg-white text-black w-full" placeholder="Ex: https://link.com" onChange={(e) => setLinkValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{linkValueError}</div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisible} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => { addPublication() }}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default Publications;