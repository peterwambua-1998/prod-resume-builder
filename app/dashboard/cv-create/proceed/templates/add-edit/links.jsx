import { db } from "@/app/firebase/firebase";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Modal, Input, Select, Loading } from "react-daisyui";


const LinksUser = ({ userId }) => {
    const [links, setLinks] = useState([]);

    const [nameValue, setNameValue] = useState(null);
    const [linkValue, setLinkValue] = useState(null);

    const [titleValueError, setTitleValueError] = useState(null);
    const [linkValueError, setLinkValueError] = useState(null);

    const [visible, setVisible] = useState(false);
    var [visibleEdit, setVisibleEdit] = useState(false);
    var [visibleDelete, setVisibleDelete] = useState(false);

    var [selectedRecord, setSelectedRecord] = useState(null);
    var [selectedRecordDelete, setSelectedRecordDelete] = useState(null);
    var [loadingDelete, setLoadingDelete] = useState(false);

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
            setNameValue(data.name);
            setLinkValue(data.link);
        }
    }


    function getLinks() {
        try {
            let linksRef = collection(db, 'links');
            let q = query(linksRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setLinks([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setLinks(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function addLink() {
        if (!nameValue || nameValue == null) {
            setTitleValueError('field required');
            return;
        } else {
            setTitleValueError('');
        }

        if (linkValue == "Pick one" || linkValue == null) {
            setLinkValueError('field required');
            return;
        } else {
            setLinkValueError('');
        }

        try {
            const data = {
                user_id: userId,
                name: nameValue,
                link: linkValue,
                created_at: Timestamp.now()
            }
            const collectionRef = collection(db, 'links');
            await addDoc(collectionRef, data);
            toggleVisible();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLinks();
    }, []);

    async function saveEditDetails(recordId) {
        if (!nameValue || nameValue == null) {
            setTitleValueError('field required');
            return;
        } else {
            setTitleValueError('');
        }

        if (linkValue == "Pick one" || linkValue == null) {
            setLinkValueError('field required');
            return;
        } else {
            setLinkValueError('');
        }

        try {
            let data = {
                user_id: userId,
                name: nameValue,
                link: linkValue,
                created_at: Timestamp.now()
            }
            await updateDoc(doc(db, "links", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecord() {
        try {
            setLoadingDelete(true);
            await deleteDoc(doc(db, 'links', selectedRecordDelete.id));
            toggleVisibleDelete(null);
            setLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title>
                    <p className="text-base font-semibold">Links</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className="mb-2">
                        {links.map((link, index) => (
                            <div key={index} className="mb-2">
                                <Badge className="p-4">{link.name}
                                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => toggleVisibleEdit(link)} className="pl-3 pr-3 hover:cursor-pointer" />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => toggleVisibleDelete(link)} className="hover:cursor-pointer" />
                                </Badge>
                            </div>
                        ))}
                    </div>
                    <div className="form-control w-full grow">
                        <div className="flex gap-4">
                            <Button className="bg-amber-200 border-amber-500 text-black" onClick={() => { toggleVisible() }}>Add</Button>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion>

            <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold text-black">Language</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Link title</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="EX: website" onChange={(e) => setNameValue(e.target.value)} />
                                <div className="text-red-600 text-sm">{titleValueError}</div>
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Link</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="EX: www.website.com" onChange={(e) => setLinkValue(e.target.value)} />
                                <div className="text-red-600 text-sm">{linkValueError}</div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisible} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => addLink()}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>

            {
                selectedRecordDelete ? (
                    <Modal.Legacy open={visibleDelete} className="bg-white">
                        <Modal.Header className="font-bold text-base">Delete Experience</Modal.Header>
                        <Modal.Body className="p-0">
                            <p>Delete link for {selectedRecordDelete.name}</p>
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

            {
                selectedRecord ?
                    <Modal.Legacy open={visibleEdit} className="bg-white max-w-5xl">
                        <form>
                            <Modal.Header className="font-bold text-black">Link</Modal.Header>
                            <Modal.Body className="p-0">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-black">Link title</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <Input defaultValue={selectedRecord.name ? selectedRecord.name : ''} className="bg-white text-black grow" placeholder="EX: website" onChange={(e) => setNameValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{titleValueError}</div>
                                    </div>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-black">Link</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <Input defaultValue={selectedRecord.link ? selectedRecord.link : ''} className="bg-white text-black grow" placeholder="EX: www.website.com" onChange={(e) => setLinkValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{linkValueError}</div>
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
        </div>
    );
}

export default LinksUser;