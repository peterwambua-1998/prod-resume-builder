import { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Textarea, Accordion, Card } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase/firebase";


const ExperienceWidget = ({user_id}) => {
    const [visible, setVisible] = useState(false);
    var [experienceData, setExperienceData] = useState([]);
    var [companyName, setCompanyName] = useState(null);
    var [currentEmployment, setCurrentEmployment] = useState(null);
    var [employmentType, setEmploymentType] = useState(null);
    var [startDate, setStartDate] = useState(null);
    var [endDate, setEndDate] = useState(null);
    var [uTitle, setUTitle] = useState(null);
    var [uDescription, setUDescription] = useState(null);
    var [location, setLocation] = useState(null);
    var [locationType, setLocationType] = useState(null);

    const [err, setErr] = useState(null);

    const toggleVisibleEdu = () => {
        setVisible(!visible);
    };

    // error handling
    var [companyNameError, setCompanyNameError] = useState(null);
    var [currentEmploymentError, setCurrentEmploymentError] = useState(null);
    var [employmentTypeError, setEmploymentTypeError] = useState(null);
    var [startDateError, setStartDateError] = useState(null);
    var [endDateError, setEndDateError] = useState(null);
    var [uTitleError, setUTitleError] = useState(null);
    var [uDescriptionError, setUDescriptionError] = useState(null);
    var [locationError, setLocationError] = useState(null);
    var [locationTypeError, setLocationTypeError] = useState(null);

    

    async function checkExperience(userId) {
        console.log(user_id);
        let experienceRef =  collection(db, 'experience');
        let q =  query(experienceRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setExperienceData([]);
            doc.forEach((data) => {
                console.log(data);
                setExperienceData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function addExperience() {
        if (uTitle == null || !uTitle) {
            setUTitleError('field required');
            return;
        } else {
            setUTitleError(null);
        }


        if (employmentType == 'Pick one' || !employmentType) {
            setEmploymentTypeError('field required');
            return;
        } else {
            setEmploymentTypeError(null);
        }

        if (!companyName || companyName == null) {
            setCompanyNameError('field required');
            return;
        } else {
            setCompanyNameError(null);
        }

        if (!location || location == null) {
            setLocationError('field required');
            return;
        } else {
            setLocationError(null);
        }

        if (!locationType || locationType == null) {
            setLocationTypeError('field required');
            return;
        } else {
            setLocationTypeError(null);
        }

        if (!startDate || startDate == null) {
            setStartDateError('field required');
            return;
        } else {
            setStartDateError(null);
        }

        if (!endDate || endDate == null) {
            setEndDateError('field required');
            return;
        } else {
            setEndDateError(null);
        }

        if (!uDescription || uDescription == null) {
            setUDescriptionError('field required');
            return;
        } else {
            setUDescriptionError(null);
        }


        try {
            let experienceRef =  collection(db, 'experience');
            await addDoc(experienceRef, {
                title: uTitle,
                employmentType: employmentType,
                companyName: companyName,
                location: location,
                locationType: locationType,
                startDate: startDate,
                endDate: endDate,
                description: uDescription,
                user_id: user_id,
                created_at: Timestamp.now()
            });

            toggleVisibleEdu();
        } catch (error) {
            setErr('system error please try again');
            console.log(error);
        }
    }

    useEffect(() => {
        checkExperience(user_id);
    }, [])

    
    return (  
        <main className="mb-5 p-2">
            <Accordion className="bg-white border border-slate-400 text-black" icon="arrow">
                <Accordion.Title className="text-xl font-medium ">
                    <p className="mb-2">Experience</p>
                    <p className="text-sm font-normal">Click to add experience</p>
                </Accordion.Title>
                <Accordion.Content>
                        <div className="md:grid md:grid-cols-2 gap-2 mb-2 items-center">
                            {experienceData.map((exp, index) => (
                                <div key={index}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title tag="h2">{exp.companyName}</Card.Title>
                                            <p>{exp.title}</p>
                                            <p>{exp.location}</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                                
                            ))}
                        </div>
                        
                        <div className="form-control w-full grow">
                            <div className="">
                                <Button color="info" onClick={toggleVisibleEdu}>Add Experience</Button>
                            </div>
                        </div>
                </Accordion.Content>
            </Accordion>

            <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Experience</Modal.Header>
                    <Modal.Body className="p-0">
                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Job Title</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="title" onChange={(e) => setUTitle(e.target.value)} />
                                        <div className="text-red-600 text-sm">{uTitleError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Employment Type</span>
                                        </label>
                                        <Select className="bg-white text-black" defaultValue={'default'} onChange={(e) => setEmploymentType(e.target.value)} >
                                            <option value={'default'} disabled>
                                                Pick one
                                            </option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Self-employed">Self-employed</option>
                                            <option value="Freelance">Freelance</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Apprenticeship">Apprenticeship</option>
                                            <option value="Seasonal">Seasonal</option>
                                        </Select>
                                        <div className="text-red-600 text-sm">{employmentTypeError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Company name</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: google" onChange={(e) => setCompanyName(e.target.value)} />
                                        <div className="text-red-600 text-sm">{companyNameError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Location</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: united states" onChange={(e) => setLocation(e.target.value)} />
                                        <div className="text-red-600 text-sm">{locationError}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-start gap-2 ">
                                <div className="form-control w-full">
                                    <label className="label ">
                                        <span className="label-text text-black">Location type</span>
                                    </label>
                                    <Select className="bg-white text-black" defaultValue={'default'} onChange={(e) => setLocationType(e.target.value)} >
                                        <option value={'default'} disabled>
                                            Pick one
                                        </option>
                                        <option value="On-site">On-site</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Remote">Remote</option>
                                    </Select>
                                    <div className="text-red-600 text-sm">{locationTypeError}</div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Start date</span>
                                        </label>
                                        <Input type="date" className="bg-white text-black" placeholder="school" onChange={(e) => setStartDate(e.target.value)} />
                                        <div className="text-red-600 text-sm">{startDateError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">End date</span>
                                        </label>
                                        <Input type="date" className="bg-white text-black" placeholder="school" onChange={(e) => setEndDate(e.target.value)} />
                                        <div className="text-red-600 text-sm">{endDateError}</div>
                                    </div>
                                </div>


                            </div>

                            
                            <div className="w-full items-center justify-end gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Describe what you did</span>
                                    </label>
                                    <Textarea className="bg-white text-black" onChange={(e) => setUDescription(e.target.value)} />
                                    <div className="text-red-600 text-sm">{uDescriptionError}</div>
                                </div>
                            </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => addExperience()}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </main>
    );
}
 
export default ExperienceWidget;