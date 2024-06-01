import { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Accordion, Card, Textarea } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase/firebase";



const EducationWidget = ({user_id}) => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    var [eduData, setEduData] = useState([]);
    var [school, setSchool] = useState(null);
    var [degree, setDegree] = useState(null);
    var [fieldStudy, setFieldStudy] = useState(null);
    var [starDate, setStartDate] = useState(null);
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

    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    async function checkEdu(userId) {
        let eduRef =  collection(db, 'education');
        let q =  query(eduRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setEduData([]);
            doc.forEach((data) => {
                setEduData((prev) => [...prev, data.data()]);
            })
        })
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

      
        if (starDate == null || !starDate) {
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
            let eduRef =  collection(db, 'education');
            await addDoc(eduRef, {
                school: school,
                degree: degree,
                fieldStudy: fieldStudy,
                startDate: starDate,
                endDate: endDate,
                grade: grade,
                descriptionEdu: descriptionEdu,
                user_id: user_id,
                created_at: Timestamp.now()
            });

            toggleVisibleEdu();
        } catch (error) {
            console.log('system error please try again');
        }
    }

    useEffect(() => {
        checkEdu(user_id);
    }, [])
   
    return (  
        <div className="mb-5 mt-4 p-2">

            <Accordion className=" bg-white border border-slate-400 text-black" icon="arrow" >
                <Accordion.Title className="text-xl font-medium ">
                    <p className="mb-2">Education</p>
                    <p className="text-sm font-normal">Click to add education</p>
                </Accordion.Title>
                <Accordion.Content>
                        <div className="md:grid md:grid-cols-2 gap-2 mb-2 items-center">
                            {eduData.map((edu, index) => (
                                <div key={index}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title tag="h2">{edu.school}</Card.Title>
                                            <p>{edu.degree}</p>
                                            <p>{edu.fieldStudy}</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                                
                            ))}
                        </div>
                        
                        <div className="form-control w-full grow">
                            <div className="">
                                <Button color="info" onClick={toggleVisibleEdu}>Add Education</Button>
                            </div>
                        </div>
                </Accordion.Content>
            </Accordion>

           <Modal.Legacy open={visibleEdu} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Eduction</Modal.Header>
                    <Modal.Body className="p-0">
                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">School / Institution</span>
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
                                            <span className="label-text text-black">Field Of Study</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: Business" onChange={(e) => setFieldStudy(e.target.value)} />
                                        <div className="text-red-600 text-sm">{fieldStudyError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Start Date</span>
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
                                            <span className="label-text text-black">End Date</span>
                                        </label>
                                        <Input type="date" className="bg-white text-black" onChange={(e) => setEndDate(e.target.value)} />
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
                                            <span className="label-text text-black">Description (Optional)</span>
                                        </label>
                                        <Textarea className="bg-white text-black" placeholder="Description" onChange={(e) => setDescriptionEdu(e.target.value)} />
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
 
export default EducationWidget;