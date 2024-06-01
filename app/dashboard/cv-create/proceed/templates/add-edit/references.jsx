'use client'
import { useEffect, useState } from "react";
import { Input, Button, Modal, Accordion, Badge } from "react-daisyui";
import { collection, query, where, onSnapshot, Timestamp, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ReferencesEditDelete = ({ userId }) => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    var [visibleEdit, setVisibleEdit] = useState(false);

    const [refrences, setRefrences] = useState([]);

    const [emailValue, setEmailValue] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const [organizationValue, setOrganizationValue] = useState(null);
    const [organizationError, setOrganizationError] = useState(null);

    const [phoneValue, setPhoneValue] = useState(null);
    const [phoneError, setPhoneError] = useState(null);

    const [refereeNameValue, setRefereeNameValue] = useState(null);
    const [refereeNameError, setRefereeNameError] = useState(null);

    const [roleValue, setRoleValue] = useState(null);
    const [roleValueError, setRoleValueError] = useState(null);

    var [selectedRecord, setSelectedRecord] = useState(null);

    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    const toggleVisibleEdit = (record) => {
        console.log(record);
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
            setRefereeNameValue(data.referee_name);
            setEmailValue(data.email);
            setPhoneValue(data.phone);
            setOrganizationValue(data.organization);
            setRoleValue(data.role);
        }
    }

    async function addReferences() {
        if (refereeNameValue == null || !refereeNameValue) {
            setRefereeNameError('field required');
            return;
        } else {
            setRefereeNameError(null);
        }

        if (emailValue == null || !emailValue) {
            setEmailError('field required');
            return;
        } else {
            setEmailError(null);
        }

        if (phoneValue == null || !phoneValue) {
            setPhoneError('field required');
            return;
        } else {
            setPhoneError(null);
        }

        if (organizationValue == null || !organizationValue) {
            setOrganizationError('field required');
            return;
        } else {
            setOrganizationError(null);
        }

        if (roleValue == null || !roleValue) {
            setRoleValueError('field required');
            return;
        } else {
            setRoleValueError(null);
        }

        try {
            const data = {
                user_id: userId,
                email: emailValue,
                organization: organizationValue,
                phone: phoneValue,
                referee_name: refereeNameValue,
                role: roleValue,
                user_id: userId,
                created_at: Timestamp.now()
            }

            const collectionRef = collection(db, 'references');
            await addDoc(collectionRef, data);
            toggleVisibleEdu();
        } catch (error) {
            console.log(error);
        }
    }

    function getReferences() {
        try {
            let referencesRef = collection(db, 'references');
            let q = query(referencesRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setRefrences([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setRefrences(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function saveEditDetails(recordId) {
        if (refereeNameValue == null || !refereeNameValue) {
            setRefereeNameError('field required');
            return;
        } else {
            setRefereeNameError(null);
        }

        if (emailValue == null || !emailValue) {
            setEmailError('field required');
            return;
        } else {
            setEmailError(null);
        }

        if (phoneValue == null || !phoneValue) {
            setPhoneError('field required');
            return;
        } else {
            setPhoneError(null);
        }

        if (organizationValue == null || !organizationValue) {
            setOrganizationError('field required');
            return;
        } else {
            setOrganizationError(null);
        }

        if (roleValue == null || !roleValue) {
            setRoleValueError('field required');
            return;
        } else {
            setRoleValueError(null);
        }

        try {
            const data = {
                user_id: userId,
                email: emailValue,
                organization: organizationValue,
                phone: phoneValue,
                referee_name: refereeNameValue,
                role: roleValue,
                user_id: userId,
                created_at: Timestamp.now()
            }

            await updateDoc(doc(db, "references", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReferences();
    }, []);

    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 ">
                <Accordion.Title className="text-xl font-medium">
                    <p className="text-base font-semibold">References</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className="flex gap-2 mb-2 items-center">
                        {refrences.map((refrence, index) => (
                            <div key={index}>
                                <Badge className="p-4">{refrence.referee_name} <FontAwesomeIcon className="pl-3 hover:cursor-pointer" onClick={() => toggleVisibleEdit(refrence)} icon={faPencilAlt} /></Badge>
                            </div>
                        ))}
                    </div>
                    <div className="form-control w-full grow">
                        <div className="">
                            <Button className="bg-amber-200 border-amber-500 text-black" onClick={toggleVisibleEdu}>Add References</Button>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion>


            {
                selectedRecord ?
                    <Modal.Legacy open={visibleEdit} className="bg-white max-w-5xl">
                        <form>
                            <Modal.Header className="font-bold">Reference</Modal.Header>
                            <Modal.Body className="p-0">
                                <div className="md:grid grid-cols-2 gap-4">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="">Referee Full Name</span>
                                        </label>
                                        <div>
                                            <Input defaultValue={selectedRecord.referee_name ? selectedRecord.referee_name : ''} className="bg-white text-black w-full" placeholder="Ex: John Doe" onChange={(e) => setRefereeNameValue(e.target.value)} />
                                            <div className="text-red-600 text-sm">{refereeNameError}</div>
                                        </div>
                                    </div>
                                    <div className="form-control w-full grow">
                                        <label className="label">
                                            <span className="">Referee email</span>
                                        </label>
                                        <div>
                                            <Input defaultValue={selectedRecord.email ? selectedRecord.email : ''} className="bg-white text-black w-full" placeholder="Ex: some@mail.com" onChange={(e) => setEmailValue(e.target.value)} />
                                            <div className="text-red-600 text-sm">{emailError}</div>

                                        </div>

                                    </div>
                                    <div className="form-control w-full grow">
                                        <label className="label">
                                            <span className="">Referee phone</span>
                                        </label>
                                        <div>
                                            <Input defaultValue={selectedRecord.email ? selectedRecord.email : ''} className="bg-white text-black w-full" placeholder="Ex: 0722111333" onChange={(e) => setPhoneValue(e.target.value)} />
                                            <div className="text-red-600 text-sm">{phoneError}</div>

                                        </div>
                                    </div>
                                    <div className="form-control w-full grow">
                                        <label className="label">
                                            <span className="">Referee organization</span>
                                        </label>
                                        <div>
                                            <Input defaultValue={selectedRecord.organization ? selectedRecord.organization : ''} className="bg-white text-black w-full" placeholder="Ex: google" onChange={(e) => setOrganizationValue(e.target.value)} />
                                            <div className="text-red-600 text-sm">{organizationError}</div>

                                        </div>

                                    </div>

                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="">Referee role</span>
                                    </label>
                                    <div>
                                        <Input defaultValue={selectedRecord.role ? selectedRecord.role : ''} className="bg-white text-black w-full" placeholder="Ex: CEO" onChange={(e) => setRoleValue(e.target.value)} />
                                        <div className="text-red-600 text-sm">{roleValueError}</div>

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
                    <Modal.Header className="font-bold">Reference</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="md:grid grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="">Referee Full Name</span>
                                </label>
                                <div>
                                    <Input className="bg-white text-black w-full" placeholder="Ex: John Doe" onChange={(e) => setRefereeNameValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{refereeNameError}</div>
                                </div>
                            </div>
                            <div className="form-control w-full grow">
                                <label className="label">
                                    <span className="">Referee email</span>
                                </label>
                                <div>
                                    <Input className="bg-white text-black w-full" placeholder="Ex: some@mail.com" onChange={(e) => setEmailValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{emailError}</div>

                                </div>

                            </div>
                            <div className="form-control w-full grow">
                                <label className="label">
                                    <span className="">Referee phone</span>
                                </label>
                                <div>
                                    <Input className="bg-white text-black w-full" placeholder="Ex: 0722111333" onChange={(e) => setPhoneValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{phoneError}</div>

                                </div>
                            </div>
                            <div className="form-control w-full grow">
                                <label className="label">
                                    <span className="">Referee organization</span>
                                </label>
                                <div>
                                    <Input className="bg-white text-black w-full" placeholder="Ex: google" onChange={(e) => setOrganizationValue(e.target.value)} />
                                    <div className="text-red-600 text-sm">{organizationError}</div>

                                </div>

                            </div>

                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="">Referee role</span>
                            </label>
                            <div>
                                <Input className="bg-white text-black w-full" placeholder="Ex: CEO" onChange={(e) => setRoleValue(e.target.value)} />
                                <div className="text-red-600 text-sm">{roleValueError}</div>

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => { addReferences() }}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default ReferencesEditDelete;