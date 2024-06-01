'use client'
import { useEffect, useState } from "react";
import { Input, Accordion, Button, Modal, Badge, Loading } from "react-daisyui";
import { collection, Timestamp, addDoc, query, where, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProjectsAddEdit = ({ userId }) => {
    const [projects, setProjects] = useState([]);

    const [projectValue, setProjectValue] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);

    const [projectValueError, setProjectValueError] = useState(null);
    const [descriptionValueError, setDescriptionValueError] = useState(null);

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
            setProjectValue(data.title);
            setDescriptionValue(data.description);
        }
    }

    function getProjects() {
        try {
            let awardsRef = collection(db, 'project');
            let q = query(awardsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setProjects([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setProjects(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function saveEditDetails(recordId) {
        if (!projectValue || projectValue == null) {
            setProjectValueError('field required');
            return;
        } else {
            setProjectValueError('');
        }

        if (!descriptionValue || descriptionValue == null) {
            setDescriptionValueError('field required');
            return;
        } else {
            setDescriptionValueError('');
        }

        try {
            let data = {
                user_id: userId,
                title: projectValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }
            await updateDoc(doc(db, "project", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecord() {
        try {
            setLoadingDelete(true);
            await deleteDoc(doc(db, 'project', selectedRecordDelete.id));
            toggleVisibleDelete(null);
            setLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);


    async function addProject() {

        if (!projectValue || projectValue == null) {
            setProjectValueError('field required');
            return;
        } else {
            setProjectValueError('');
        }

        if (!descriptionValue || descriptionValue == null) {
            setDescriptionValueError('field required');
            return;
        } else {
            setDescriptionValueError('');
        }

        try {
            const data = {
                user_id: userId,
                title: projectValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }

            const collectionRef = collection(db, 'project');
            await addDoc(collectionRef, data);
            toggleVisible();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title>
                    <p className="text-base font-semibold">Projects</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className=" mb-5 ">
                        {projects.map((project, index) => (
                            <div key={index} className="mb-2">
                                <Badge className="p-4">{project.title}
                                    <FontAwesomeIcon className="pl-3 pr-3 hover:cursor-pointer" icon={faPencilAlt} onClick={() => toggleVisibleEdit(project)} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => toggleVisibleDelete(project)} className="hover:cursor-pointer" />
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

            {
                selectedRecordDelete ? (
                    <Modal.Legacy open={visibleDelete} className="bg-white">
                        <Modal.Header className="font-bold text-base">Delete Experience</Modal.Header>
                        <Modal.Body className="p-0">
                            <p>Delete project {selectedRecordDelete.title}</p>
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
                            <Modal.Header className="font-bold text-black">Project</Modal.Header>
                            <Modal.Body className="p-0">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-black">Title</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <Input defaultValue={selectedRecord.title ? selectedRecord.title : ''} className="bg-white text-black grow" placeholder="Title" onChange={(e) => setProjectValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{projectValueError}</div>
                                    </div>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-black">Description</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <Input defaultValue={selectedRecord.description ? selectedRecord.description : ''} className="bg-white text-black grow" placeholder="Description" onChange={(e) => setDescriptionValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{descriptionValueError}</div>
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
                    <Modal.Header className="font-bold text-black">Project</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Title</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Title" onChange={(e) => setProjectValue(e.target.value)} />
                                <div className="text-red-600 text-sm">{projectValueError}</div>
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">description</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Description" onChange={(e) => setDescriptionValue(e.target.value)} />
                                <div className="text-red-600 text-sm">{descriptionValueError}</div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisible} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => { addProject() }}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default ProjectsAddEdit;