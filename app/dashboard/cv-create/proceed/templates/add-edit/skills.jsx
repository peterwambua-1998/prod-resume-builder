import { useState, useEffect } from "react";
import { Button, Input, Modal, Badge, Accordion, Loading } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";


const SkillAddEdit = ({ user_id }) => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    var [visibleEdit, setVisibleEdit] = useState(false);
    var [visibleDelete, setVisibleDelete] = useState(false);

    var [skillName, setSkillName] = useState([]);
    var [skillNameError, setSkillNameError] = useState(null);
    var [skillLevel, setSkillLevel] = useState([]);
    var [skillLevelError, setSkillLevelError] = useState(null);
    var [skillData, setSkillData] = useState([]);

    var [selectedRecord, setSelectedRecord] = useState(null);
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
            setSkillName(data.name);
            setSkillLevel(data.skillLevel);
        }
    }

    async function saveEditDetails(recordId) {
        if (skillName == null || !skillName) {
            setSkillNameError('field required');
            return;
        } else {
            setSkillNameError(null);
        }


        if (skillLevel == null || !skillLevel) {
            setSkillLevel('field required');
            return;
        } else {
            setSkillLevel(null);
        }

        try {
            let data = {
                name: skillName,
                skillLevel: skillLevel,
                user_id: user_id,
                created_at: Timestamp.now()
            }

            await updateDoc(doc(db, "skill", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
            console.log('system error please try again');
        }
    }

    async function checkSkill(userId) {
        let skillRef = collection(db, 'skill');
        let q = query(skillRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setSkillData([]);
            doc.forEach((data) => {
                let docId = data.id;
                const documentData = data.data();
                const newData = { ...documentData, id: docId };
                setSkillData((prev) => [...prev, newData]);
            })
        })
    }

    async function addSkill() {
        if (skillName == null || !skillName) {
            setSkillNameError('field required');
            return;
        } else {
            setSkillNameError(null);
        }

        if (skillLevel == null || !skillLevel) {
            setSkillLevel('field required');
            return;
        } else {
            setSkillLevel(null);
        }

        try {
            let skillRef = collection(db, 'skill');
            await addDoc(skillRef, {
                name: skillName,
                skillLevel: skillLevel,
                user_id: user_id,
                created_at: Timestamp.now()
            });
            toggleVisibleEdu();
        } catch (error) {
            console.log('system error please try again');
        }
    }

    async function deleteRecord() {
        try {
            setLoadingDelete(true);
            await deleteDoc(doc(db, 'skill', selectedRecordDelete.id));
            toggleVisibleDelete(null);
            setLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkSkill(user_id);
    }, [])

    return (

        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title>
                    <p className="text-base font-semibold">Skills</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className="mb-2">
                        {skillData.map((edu, index) => (
                            <div key={index} className="mb-2">
                                <Badge className="p-4">{edu.name}
                                    <FontAwesomeIcon className="pl-3 pr-3 hover:cursor-pointer" onClick={() => toggleVisibleEdit(edu)} icon={faPencilAlt} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => toggleVisibleDelete(edu)} className="hover:cursor-pointer" />
                                </Badge>
                            </div>
                        ))}
                    </div>
                    <div className="form-control w-full grow">
                        <div className="">
                            <Button className="bg-amber-200 border-amber-500 text-black" onClick={toggleVisibleEdu}>Add</Button>
                        </div>
                    </div>

                </Accordion.Content>
            </Accordion>

            {
                selectedRecordDelete ? (
                    <Modal.Legacy open={visibleDelete} className="bg-white">
                        <Modal.Header className="font-bold text-base">Delete Experience</Modal.Header>
                        <Modal.Body className="p-0">
                            <p>Delete skill {selectedRecordDelete.name}</p>
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
                            <Modal.Header className="font-bold text-black">Skill</Modal.Header>
                            <Modal.Body className="p-0 md:grid md:grid-cols-2">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-black">Edit Skill</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <Input defaultValue={selectedRecord.name ? selectedRecord.name : ''} className="bg-white w-full text-black" placeholder="Ex: Databases" onChange={(e) => setSkillName(e.target.value)} />
                                        <div className="text-red-600 text-sm">{skillNameError}</div>
                                    </div>
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-black">Rate skill level between 1 and 10</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <Input type="number" className="bg-white w-full text-black" defaultValue={selectedRecord.skillLevel ? selectedRecord.skillLevel : ''} maxLength={2} minLength={0} placeholder="Ex: 9" onChange={(e) => setSkillLevel(e.target.value)} />
                                        <div className="text-red-600 text-sm">{skillLevelError}</div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Actions>
                                <Button type="button" onClick={() => toggleVisibleEdit(null)} >Close</Button>
                                <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => saveEditDetails(selectedRecord.id)}>Save</Button>
                            </Modal.Actions>
                        </form>
                    </Modal.Legacy>
                    : <div></div>
            }
            <Modal.Legacy open={visibleEdu} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold text-black">Skill</Modal.Header>
                    <Modal.Body className="p-0 md:grid md:grid-cols-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Add skill</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white w-full text-black" placeholder="Ex: Databases" onChange={(e) => setSkillName(e.target.value)} />
                                <div className="text-red-600 text-sm">{skillNameError}</div>
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Rate skill level between 0 and 10</span>
                            </label>
                            <div className="flex gap-4">
                                <Input type="number" className="bg-white w-full text-black" maxLength={2} minLength={0} placeholder="Ex: 9" onChange={(e) => setSkillLevel(e.target.value)} />
                                <div className="text-red-600 text-sm">{skillLevelError}</div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => { addSkill() }}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default SkillAddEdit;