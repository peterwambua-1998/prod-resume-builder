import { useEffect, useState } from "react";
import { Modal, Button, Input, Accordion, Badge } from "react-daisyui";
import { collection, addDoc, Timestamp, query, onSnapshot, where, updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const EducationAddEdit = ({ userId }) => {
    var [eduData, setEduData] = useState([]);

    var [school, setSchool] = useState(null);
    var [degree, setDegree] = useState(null);
    var [fieldStudy, setFieldStudy] = useState(null);
    var [startDate, setStartDate] = useState(null);
    var [endDate, setEndDate] = useState(null);
    var [grade, setGrade] = useState(null);
    var [descriptionEdu, setDescriptionEdu] = useState(null);

    var [schoolError, setSchoolError] = useState(null);
    var [degreeError, setDegreeError] = useState(null);
    var [fieldStudyError, setFieldStudyError] = useState(null);
    var [startDateError, setStartDateError] = useState(null);
    var [endDateError, setEndDateError] = useState(null);
    var [gradeError, setGradeError] = useState(null);
    var [descriptionEduError, setDescriptionEduError] = useState(null);
    const [visibleEdu, setVisibleEdu] = useState(false);
    var [visibleEdit, setVisibleEdit] = useState(false);

    var [selectedRecord, setSelectedRecord] = useState(null);

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

    function addRespRecords(data) {
        if (data) {
            setSchool(data.school);
            setDegree(data.degree);
            setFieldStudy(data.fieldStudy);
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setGrade(data.grade);
            setDescriptionEdu(data.descriptionEdu);
        }
    }

    async function checkEdu(userId) {
        let eduRef = collection(db, 'education');
        let q = query(eduRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setEduData([]);
            doc.forEach((data) => {
                let docId = data.id;
                const documentData = data.data();
                const newData = { ...documentData, id: docId };
                setEduData((prev) => [...prev, newData]);
            })
        })
    }

    async function saveEditDetails(recordId) {
        if (school == null || !school) {
            setSchoolError('field required');
            return;
        } else {
            setSchoolError(null);
        }


        if (degree == null || !degree) {
            setDegreeError('field required');
            return;
        } else {
            setDegreeError(null);
        }


        if (fieldStudy == null || !fieldStudy) {
            setFieldStudyError('field required');
            return;
        } else {
            setFieldStudyError(null);
        }


        if (startDate == null || !startDate) {
            setStartDateError('field required');
            return;
        } else {
            setStartDateError(null);
        }


        if (endDate == null || !endDate) {
            setEndDateError('field required');
            return;
        } else {
            setEndDateError(null);
        }

        if (grade == null || !grade) {
            setGradeError('field required');
            return;
        } else {
            setGradeError(null);
        }


        if (descriptionEdu == null || !descriptionEdu) {
            setDescriptionEduError('field required');
            return;
        } else {
            setDescriptionEduError(null);
        }

        try {
            let data = {
                school: school,
                degree: degree,
                fieldStudy: fieldStudy,
                startDate: startDate,
                endDate: endDate,
                grade: grade,
                descriptionEdu: descriptionEdu,
                user_id: userId,
                created_at: Timestamp.now()
            }
            await updateDoc(doc(db, "education", recordId), data);
            toggleVisibleEdit(null);
        } catch (error) {
            console.log(error);
        }
    }

    async function addEdu() {
        if (school == null || !school) {
            setSchoolError('field required');
            return;
        } else {
            setSchoolError(null);
        }


        if (degree == null || !degree) {
            setDegreeError('field required');
            return;
        } else {
            setDegreeError(null);
        }


        if (fieldStudy == null || !fieldStudy) {
            setFieldStudyError('field required');
            return;
        } else {
            setFieldStudyError(null);
        }



        if (startDate == null || !startDate) {
            setStartDateError('field required');
            return;
        } else {
            setStartDateError(null);
        }


        if (endDate == null || !endDate) {
            setEndDateError('field required');
            return;
        } else {
            setEndDateError(null);
        }

        if (grade == null || !grade) {
            setGradeError('field required');
            return;
        } else {
            setGradeError(null);
        }


        if (descriptionEdu == null || !descriptionEdu) {
            setDescriptionEduError('field required');
            return;
        } else {
            setDescriptionEduError(null);
        }

        try {
            let eduRef = collection(db, 'education');
            await addDoc(eduRef, {
                school: school,
                degree: degree,
                fieldStudy: fieldStudy,
                startDate: startDate,
                endDate: endDate,
                grade: grade,
                descriptionEdu: descriptionEdu,
                user_id: userId,
                created_at: Timestamp.now()
            });

            toggleVisibleEdu();
        } catch (error) {
            console.log('system error please try again');
        }
    }

    useEffect(() => {
        checkEdu(userId);
    }, [])

    return (
        <div className="mb-3">
            <Accordion className="bg-amber-400 text-black">
                <Accordion.Title>
                    <p className="text-base font-semibold">Education</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className="flex gap-2 mb-2 items-center">
                        {eduData.map((edu, index) => (
                            <div key={index}>
                                <Badge className="p-4">{edu.school} <FontAwesomeIcon className="pl-3 hover:cursor-pointer" onClick={() => toggleVisibleEdit(edu)} icon={faPencilAlt} /></Badge>
                            </div>
                        ))}
                    </div>
                    <div className="form-control w-full grow">
                        <div className="">
                            <Button className="bg-amber-200 border-amber-500 text-black" onClick={toggleVisibleEdu}>Add Education</Button>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion>

            {selectedRecord ?
                <Modal.Legacy open={visibleEdit} className="bg-white max-w-5xl">
                    <form>
                        <Modal.Header className="font-bold">Eduction</Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">School</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.school ? selectedRecord.school : ''} className="bg-white text-black" placeholder="school" onChange={(e) => setSchool(e.target.value)} />
                                        <div className="text-red-600 text-sm">{schoolError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Degree</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.degree ? selectedRecord.degree : ''} className="bg-white text-black" placeholder="Ex: Bachelors" onChange={(e) => setDegree(e.target.value)} />
                                        <div className="text-red-600 text-sm">{degreeError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Field of study</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.fieldStudy ? selectedRecord.fieldStudy : ''} className="bg-white text-black" placeholder="Ex: Business" onChange={(e) => setFieldStudy(e.target.value)} />
                                        <div className="text-red-600 text-sm">{fieldStudyError}</div>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Start date</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.startDate ? selectedRecord.startDate : ''} type="date" className="bg-white text-black" onChange={(e) => setStartDate(e.target.value)} />
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
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Grade</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.grade ? selectedRecord.grade : ''} className="bg-white text-black" placeholder="grade" onChange={(e) => setGrade(e.target.value)} />
                                        <div className="text-red-600 text-sm">{gradeError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">

                                <div className="flex w-full items-center justify-start gap-2 mb-3 col-span-2">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Description (optional)</span>
                                        </label>
                                        <Input defaultValue={selectedRecord.descriptionEdu ? selectedRecord.descriptionEdu : ''} className="bg-white text-black" placeholder="Description" onChange={(e) => setDescriptionEdu(e.target.value)} />
                                        <div className="text-red-600 text-sm">{descriptionEduError}</div>
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

            <Modal.Legacy open={visibleEdu} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Eduction</Modal.Header>
                    <Modal.Body className="p-0">
                        
                        <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                            <div className="flex w-full items-center justify-start gap-2 mb-3">
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text text-black">School</span>
                                    </label>
                                    <Input className="bg-white text-black" placeholder="school" onChange={(e) => setSchool(e.target.value)} />
                                    <div className="text-red-600 text-sm">{schoolError}</div>
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-start gap-2 mb-3">
                                <div className="form-control w-full">
                                    <label className="label ">
                                        <span className="label-text text-black">Degree</span>
                                    </label>
                                    <Input className="bg-white text-black" placeholder="Ex: Bachelors" onChange={(e) => setDegree(e.target.value)} />
                                    <div className="text-red-600 text-sm">{degreeError}</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                            <div className="flex w-full items-center justify-start gap-2 mb-3">
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text text-black">Field of study</span>
                                    </label>
                                    <Input className="bg-white text-black" placeholder="Ex: Business" onChange={(e) => setFieldStudy(e.target.value)} />
                                    <div className="text-red-600 text-sm">{fieldStudyError}</div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-start gap-2 mb-3">
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text text-black">Start date</span>
                                    </label>
                                    <Input type="date" className="bg-white text-black" onChange={(e) => setStartDate(e.target.value)} />
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
                            <div className="flex w-full items-center justify-start gap-2 mb-3">
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text text-black">Grade</span>
                                    </label>
                                    <Input className="bg-white text-black" placeholder="grade" onChange={(e) => setGrade(e.target.value)} />
                                    <div className="text-red-600 text-sm">{gradeError}</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">

                            <div className="flex w-full items-center justify-start gap-2 mb-3 col-span-2">
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text text-black">Description (optional)</span>
                                    </label>
                                    <Input className="bg-white text-black" placeholder="Description" onChange={(e) => setDescriptionEdu(e.target.value)} />
                                    <div className="text-red-600 text-sm">{descriptionEduError}</div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => addEdu()}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}

export default EducationAddEdit;