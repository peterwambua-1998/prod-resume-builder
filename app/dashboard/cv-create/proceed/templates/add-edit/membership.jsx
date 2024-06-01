'use client'

import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Modal, Loading, Input } from "react-daisyui";

const Memberships = ({ userId }) => {
    const [memberships, setMemberships] = useState([]);

    const [orgNameValue, setOrgNameValue] = useState(null);
    const [orgNameValueError, setOrgNameValueError] = useState(null);


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
        }
    }

    function getMemberships() {
        try {
            let membershipRef = collection(db, 'memberships');
            let q = query(membershipRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setMemberships([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setMemberships(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    async function saveEditDetails(recordId) {
        if (!orgNameValue || orgNameValue == null) {
            setOrgNameValueError('field required');
        } else {
            setOrgNameValueError('');
        }

        try {
            let data = {
                user_id: userId,
                organization: orgNameValue,
                created_at: Timestamp.now()
            }

            await updateDoc(doc(db, "memberships", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }


    async function addMembership() {
        if (!orgNameValue || orgNameValue == null) {
            setOrgNameValueError('field required');
        } else {
            setOrgNameValueError('');
        }

        try {
            let data = {
                user_id: userId,
                organization: orgNameValue,
                created_at: Timestamp.now()
            }

            const collectionRef = collection(db, 'memberships');
            await addDoc(collectionRef, data);
            toggleVisible();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecord() {
        try {
            setLoadingDelete(true);
            await deleteDoc(doc(db, 'memberships', selectedRecordDelete.id));
            toggleVisibleDelete(null);
            setLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMemberships();
    }, []);


    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title >
                    <p className="text-base font-semibold">Membership</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className=" mb-2 ">
                        {memberships.map((membership, index) => (
                            <div key={index} className="mb-2">
                                <Badge className="w-fit  p-4">
                                    {membership.organization}
                                    <FontAwesomeIcon className="pl-3 pr-3 hover:cursor-pointer" onClick={() => toggleVisibleEdit(membership)} icon={faPencilAlt} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => toggleVisibleDelete(membership)} className="hover:cursor-pointer" />
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
                            <p>Delete membership at {selectedRecordDelete.organization}</p>
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
                        <Modal.Header className="font-bold">Membership</Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="md:grid grid-cols-2 gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="">Organization</span>
                                    </label>
                                    <div>
                                        <Input type="text" defaultValue={selectedRecord.organization ? selectedRecord.organization : ''} className="bg-white text-black w-full" placeholder="Ex: Safaricom" onChange={(e) => setOrgNameValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{orgNameValueError}</div>
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
                    <Modal.Header className="font-bold">Membership</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="md:grid grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="">Organization</span>
                                </label>
                                <div>
                                    <Input type="text" className="bg-white text-black w-full" placeholder="Ex: Organization" onChange={(e) => setOrgNameValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{orgNameValueError}</div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisible} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => { addMembership() }}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default Memberships;