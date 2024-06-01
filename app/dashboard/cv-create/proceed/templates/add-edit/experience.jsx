import { useEffect, useState } from "react";
import { Modal, Button, Input, Select, Textarea, Accordion, Badge, Loading } from "react-daisyui";
import { collection, addDoc, Timestamp, query, where, onSnapshot, updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";


const ExperienceAddEdit = ({ user_id }) => {
    const [visible, setVisible] = useState(false);
    var [visibleEdit, setVisibleEdit] = useState(false);
    var [visibleDelete, setVisibleDelete] = useState(false);

    var [companyName, setCompanyName] = useState(null);
    var [currentEmployment, setCurrentEmployment] = useState(null);
    var [employmentType, setEmploymentType] = useState(null);
    var [startDate, setStartDate] = useState(null);
    var [endDate, setEndDate] = useState(null);
    var [uTitle, setUTitle] = useState(null);
    var [uDescription, setUDescription] = useState(null);
    var [location, setLocation] = useState(null);
    var [locationType, setLocationType] = useState(null);
    var [experienceData, setExperienceData] = useState([]);

    var [selectedRecord, setSelectedRecord] = useState(null);
    var [selectedRecordDelete, setSelectedRecordDelete] = useState(null);
    var [loadingDelete, setLoadingDelete] = useState(false);

    const [err, setErr] = useState(null);

    const toggleVisibleEdu = () => {
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
            let experienceRef = collection(db, 'experience');
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



    async function checkExperience(userId) {

        try {
            let experienceRef = collection(db, 'experience');
            let q = query(experienceRef, where("user_id", "==", userId));
            onSnapshot(q, (doc) => {
                setExperienceData([]);
                doc.forEach((data) => {
                    let docId = data.id;
                    const documentData = data.data();
                    const newData = { ...documentData, id: docId };
                    setExperienceData((prev) => [...prev, newData]);
                })
            })
        } catch (error) {
            console.log(error);
        }

    }

    function addRespRecords(data) {
        if (data) {
            setUTitle(data.title);
            setEmploymentType(data.employmentType);
            setCompanyName(data.companyName);
            setLocation(data.location);
            setLocationType(data.locationType);
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setUDescription(data.description)
        }
    }


    async function saveEditDetails(recordId) {
        console.log(uTitle);


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
            let data = {
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
            }

            await updateDoc(doc(db, "experience", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRecord() {
        try {
            setLoadingDelete(true);
            await deleteDoc(doc(db, 'experience', selectedRecordDelete.id));
            toggleVisibleDelete(null);
            setLoadingDelete(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkExperience(user_id);
    }, [])

    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title className="font-medium">
                    <p className="text-base font-semibold">Experience</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className="mb-5">
                        {experienceData.map((exp, index) => (
                            <div key={index} className="mb-2">
                                <Badge className="p-4">
                                    {exp.companyName}
                                    <FontAwesomeIcon icon={faPencilAlt} onClick={() => toggleVisibleEdit(exp)} className="pl-3 pr-3 hover:cursor-pointer" />
                                    {/* <FontAwesomeIcon icon={faTrash} onClick={() => toggleVisibleDelete(exp)} className="hover:cursor-pointer" /> */}
                                </Badge>
                            </div>
                        ))}
                    </div>
                    <div className="form-control w-full grow">
                        <div className="">
                            <Button className="bg-amber-200 border-amber-500 text-black" onClick={toggleVisibleEdu}>Add Experience</Button>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion>

            {
                selectedRecordDelete ? (
                    <Modal.Legacy open={visibleDelete} className="bg-white">
                        <Modal.Header className="font-bold text-base">Delete Experience</Modal.Header>
                        <Modal.Body className="p-0">
                            <p>Delete experience data from {selectedRecordDelete.companyName}</p>
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
                        <Modal.Header className="font-bold">Experience</Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Job Title</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.title ? selectedRecord.title : ''} className="bg-white text-black" placeholder="title" onChange={(e) => setUTitle(e.target.value)} />
                                        <div className="text-red-600 text-sm">{uTitleError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Employment Type</span>
                                        </label>
                                        <Select className="bg-white text-black" onChange={(e) => setEmploymentType(e.target.value)} >
                                            <option>
                                                Pick one
                                            </option>
                                            <option selected={selectedRecord.employmentType == 'Full-time' ? 'selected' : null} value="Full-time">Full-time</option>
                                            <option selected={selectedRecord.employmentType == 'Part-time' ? 'selected' : null} value="Part-time">Part-time</option>
                                            <option selected={selectedRecord.employmentType == 'Self-employed' ? 'selected' : null} value="Self-employed">Self-employed</option>
                                            <option selected={selectedRecord.employmentType == 'Freelance' ? 'selected' : null} value="Freelance">Freelance</option>
                                            <option selected={selectedRecord.employmentType == 'Contract' ? 'selected' : null} value="Contract">Contract</option>
                                            <option selected={selectedRecord.employmentType == 'Internship' ? 'selected' : null} value="Internship">Internship</option>
                                            <option selected={selectedRecord.employmentType == 'Apprenticeship' ? 'selected' : null} value="Apprenticeship">Apprenticeship</option>
                                            <option selected={selectedRecord.employmentType == 'Seasonal' ? 'selected' : null} value="Seasonal">Seasonal</option>
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
                                        <Input defaultValue={selectedRecord.companyName ? selectedRecord.companyName : ''} className="bg-white text-black" placeholder="Ex: google" onChange={(e) => setCompanyName(e.target.value)} />
                                        <div className="text-red-600 text-sm">{companyNameError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Location</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.location ? selectedRecord.location : ''} className="bg-white text-black" placeholder="Ex: united states" onChange={(e) => setLocation(e.target.value)} />
                                        <div className="text-red-600 text-sm">{locationError}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-start gap-2 ">
                                <div className="form-control w-full">
                                    <label className="label ">
                                        <span className="label-text text-black">Location type</span>
                                    </label>
                                    <Select className="bg-white text-black" onChange={(e) => setLocationType(e.target.value)} >
                                        <option>
                                            Pick one
                                        </option>
                                        <option selected={selectedRecord.locationType == 'On-site' ? 'selected' : null} value="On-site">On-site</option>
                                        <option selected={selectedRecord.locationType == 'Hybrid' ? 'selected' : null} value="Hybrid">Hybrid</option>
                                        <option selected={selectedRecord.locationType == 'Remote' ? 'selected' : null} value="Remote">Remote</option>
                                    </Select>
                                    <div className="text-red-600 text-sm">{locationTypeError}</div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Start date</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.startDate ? selectedRecord.startDate : ''} type="date" className="bg-white text-black" placeholder="school" onChange={(e) => setStartDate(e.target.value)} />
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
                                        <Input defaultValue={selectedRecord.endDate ? selectedRecord.endDate : ''} type="date" className="bg-white text-black" placeholder="school" onChange={(e) => setEndDate(e.target.value)} />
                                        <div className="text-red-600 text-sm">{endDateError}</div>
                                    </div>
                                </div>


                            </div>


                            <div className="w-full items-center justify-end gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Describe what you did</span>
                                    </label>
                                    <Textarea defaultValue={selectedRecord.description ? selectedRecord.description : ''} className="bg-white text-black" onChange={(e) => setUDescription(e.target.value)} />
                                    <div className="text-red-600 text-sm">{uDescriptionError}</div>
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
        </div>
    );
}

export default ExperienceAddEdit;