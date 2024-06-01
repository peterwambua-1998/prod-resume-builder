'use client'
import { useEffect, useState } from "react";
import { Input, Card, Accordion, Badge, Button, Modal } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase/firebase";


const References = ({userId}) => {
    const [visibleEdu, setVisibleEdu] = useState(false);

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


    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    function getReferences() {
        try {
            let referencesRef = collection(db, 'references');
            let q = query(referencesRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setRefrences([]);
                docs.forEach(doc => {
                    setRefrences(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
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
            
            const collectionRef =  collection(db, 'references');
            const res = await addDoc(collectionRef, data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReferences();
    }, []);

    return (  
        <div>
            <Accordion className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    References
                </Accordion.Title>
                <Accordion.Content>
                        <div className="md:grid md:grid-cols-2 gap-2 mb-2 items-center">
                            {refrences.map((refrence, index) => (
                                <div key={index}>
                                    
                                    <Card>
                                        <Card.Body>
                                            <Card.Title tag="h2">{refrence.referee_name}</Card.Title>
                                            <p>{refrence.role}</p>
                                            <p>{refrence.organization}</p>
                                            <p>{refrence.email}</p>
                                            <p>Mobile No: {refrence.phone}</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <Button onClick={toggleVisibleEdu}>Add Reference</Button>
                </Accordion.Content>
            </Accordion>

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
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => {addReferences()}}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}
 
export default References;