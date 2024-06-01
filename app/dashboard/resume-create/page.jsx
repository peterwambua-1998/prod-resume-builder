'use client'
import { useState } from 'react';
import { Accordion, Button, Checkbox, Input, Modal, Textarea } from 'react-daisyui';
import ProfileDetails from '../cv-create/proceed/templates/add-edit/profile';
import ExperienceAddEdit from '../cv-create/proceed/templates/add-edit/experience';
import EducationAddEdit from '../cv-create/proceed/templates/add-edit/education';
import SkillAddEdit from '../cv-create/proceed/templates/add-edit/skills';
import AwardAddEdit from '../cv-create/proceed/templates/add-edit/awards';
import ReferencesEditDelete from '../cv-create/proceed/templates/add-edit/references';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/firebase';
import HobbiesAddEdit from '../cv-create/proceed/templates/add-edit/hobbies';
import Languages from '../cv-create/proceed/templates/add-edit/languages';
import LinksUser from '../cv-create/proceed/templates/add-edit/links';
import ProjectsAddEdit from '../cv-create/proceed/templates/add-edit/projects';
import Image from 'next/image';
import resumeImage from '@/app/images/peter2.png';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

const CreateResume = () => {
    // used to store ids for the document
    const [resumeId, setResumeId] = useState(null);
    const [aboutAiSaved, setAboutAiSaved] = useState(null);
    let [skillAiSaved, setSkillAiSaved] = useState([]);

    const [resumeTitle, setResumeTitle] = useState(null);

    const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(true);
    const [jobDescription, setJobDescription] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const [visible, setVisible] = useState(false);
    const [visibleSave, setVisibleSave] = useState(false);
    let [aboutAi, setAboutAi] = useState([]);

    let [skillsAi, setSkillsAi] = useState([])

    const [activeAbout, setActiveAbout] = useState(null);
    const [activeSkills, setActiveSkills] = useState([]);

    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
    });


    const toggleVisible = () => {
        setVisible(!visible);
    };

    const toggleVisibleSave = () => {
        setVisibleSave(!visibleSave);
    };

    async function getAboutAi() {
        // get users experiences
        let experiences = []; 
        const q = query(collection(db, "experience"), where("user_id", "==", firebase_user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let res  = doc.data();
            let d = `companyname: ${res.companyName}, 
                    role: ${res.title}, 
                    description of what i did: ${res.description},
                    employment type:  ${res.employmentType},
                    start date: ${res.startDate} end date:
                `;
            let data = {
                'company-name': res.companyName,
                'role': res.title,
                'description': res.description,
                'employment-type': res.employmentType,
                'start-date':res.startDate,
                'end-date':res.endDate,
                'location': res.location,
                'location-type': res.locationType,
            }
        });

        // get users skills
        let skills = [];
        const qS = query(collection(db, "skill"), where("user_id", "==", firebase_user.uid));
        const querySnapshotS = await getDocs(q);
        querySnapshotS.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });

        //get users about me
        let about = '';
        const docRef = doc(db, "about", firebase_user.uid);
        const docSnap = await getDoc(docRef);

        // languages
        let languages = [];
        const qL = query(collection(db, "languages"), where("user_id", "==", firebase_user.uid));
        const querySnapshotL = await getDocs(q);
        querySnapshotS.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });

        //hobbies
        let hobbies = [];
        const qH = query(collection(db, "languages"), where("user_id", "==", firebase_user.uid));
        const querySnapshotH = await getDocs(q);
        querySnapshotS.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });

        const options = {
            method: 'POST',
            body: JSON.stringify({
                "jobDescription": jobDescription,
            }),
        };

        try {
            let aboutAI = await fetch('/api/open-ai', options);
            let res = await aboutAI.json();
            console.log(res.about);
            setAboutAi(res.about);
            setSkillsAi(res.skills);
            setShowJobDescriptionInput(false);
            toggleVisible();
        } catch (error) {
            console.log(error);
        }
    }

    function setActive(value) {
        setActiveAbout(value);
    }


    function addCheckedSkill(id) {
        const updatedCheckboxes = skillsAi.map((checkbox) => {
            return checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        });
        setSkillsAi(updatedCheckboxes);
    }

    function changeMarkedCheckBox(id) {
        const updatedCheckboxes = aboutAi.map((checkbox) => {
            return checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : { ...checkbox, checked: false }
        });
        setAboutAi(updatedCheckboxes);
        console.log(updatedCheckboxes);
    }

    function setChangedAboutAi(value, id) {
        const updatedAbout = aboutAi.map((checkbox) => {
            if (checkbox.id === id) {
                checkbox.about = value;
                if (checkbox.checked) {
                    setActiveAbout(value);
                }
                return { ...checkbox };
            } else {
                return { ...checkbox };
            }
        });
        setAboutAi(updatedAbout);
    }

    function initiateSave() {
        console.log(resumeId, aboutAiSaved, skillAiSaved);
        toggleVisibleSave();
    }

    // check if the resume is already saved

    async function checkIfResumeIsSaved() {
        console.log(resumeId, aboutAiSaved, skillAiSaved);
    }

    async function saveResume() {
        // check if there is recent save
        
        // save resume at current state including ai suggestions including resume name
        try {
            let resumeRef = collection(db, 'users-resumes');
            let aiSuggestionsRef = collection(db, 'user-resume-ai-suggestions');
            let aiSuggestionsSkillsRef = collection(db, 'user-resume-ai-suggestions-skills');
            const res = await addDoc(resumeRef, {
                'title': resumeTitle,
                'jobDescription': jobDescription,
                'userId': firebase_user.uid,
                'created_at': Timestamp.now()
            });

            setResumeId(res.id);

            const aboutAiAboutResponse = await addDoc(aiSuggestionsRef, {
                'resume_id': res.id,
                'about_one_id': aboutAi[0].id,
                'about_one_about': aboutAi[0].about,
                'about_one_checked': aboutAi[0].checked,
                'about_two_id': aboutAi[1].id,
                'about_two_about': aboutAi[1].about,
                'about_two_checked': aboutAi[1].checked,
            });

            setAboutAiSaved(aboutAiAboutResponse.id);

            let skillsIds = [];

            skillsAi.forEach(async (skill, index) => {
                let skillAdds = await addDoc(aiSuggestionsSkillsRef, {
                    'resume_id': res.id,
                    'skill': skill.skill,
                    'skill_id': skill.id,
                    'skill_checked': skill.checked
                });

                setSkillAiSaved(prev => [...prev, skillAdds.id]);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="md:grid md:grid-cols-4 bg-slate-200">
            <div className="bg-white pt-10 pl-5 pr-5">

                <Accordion defaultChecked className="bg-amber-400 text-black mb-3">
                    <Accordion.Title className="text-xl font-medium text-black">
                        <p className="text-base font-semibold">Ai Suggestions</p>
                    </Accordion.Title>
                    <Accordion.Content>
                        <div className="form-control w-full grow">
                            <div className="">
                                <Button className="bg-amber-200 border-amber-500 text-black" onClick={toggleVisible}>Add / Edit</Button>
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion>

                <ProfileDetails userId={firebase_user.uid} />
                <ExperienceAddEdit user_id={firebase_user.uid} />
                <EducationAddEdit userId={firebase_user.uid} />
                <SkillAddEdit user_id={firebase_user.uid} />
                <AwardAddEdit userId={firebase_user.uid} />
                <ReferencesEditDelete userId={firebase_user.uid} />
                <HobbiesAddEdit userId={firebase_user.uid} />
                <Languages userId={firebase_user.uid} />
                <LinksUser userId={firebase_user.uid} />
                <ProjectsAddEdit userId={firebase_user.uid} />
            </div>
            <div className="md:col-span-3 p-10">
                {showJobDescriptionInput ?
                    // job desc input
                    <div className='pl-8 pr-8  flex flex-col gap-10 items-center'>
                        <Image src={resumeImage} alt='ai-resume' width={120} height={120} className='w-[40%] h-[40%]' />
                        <div className='w-full text-center'>
                            <p className='font-semibold mb-4'>Welcome, spark up your resume</p>

                            <div className='border-amber-500 bg-white flex p-2 rounded-lg'>
                                <Input onChange={(e) => setJobDescription(e.target.value)} type='text' className='w-full bg-transparent border-none rounded-none' placeholder='Enter job description here...' />
                                <Button onClick={getAboutAi}>submit</Button>
                            </div>
                        </div>
                    </div>
                    :
                    // resume
                    <div>
                        <div className='flex justify-end'>
                            <Button onClick={initiateSave}>Save</Button>
                        </div>
                       

                        <p>{activeAbout}</p>

                        {skillsAi
                            .filter((skill) => skill.checked === true)
                            .map((skill) => (
                                <div className="show-selected-skills" key={skill.id}>{skill.skill}</div>
                            ))}
                    </div>
                }
            </div>

            <Modal.Legacy open={visibleSave} className="bg-white max-w-5xl">
                <Modal.Header >
                    <p className="text-lg mb-0 border-b pb-4">Save Resume</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div>
                        <label className="label">Resume title</label>
                        <Input placeholder='Ex: Job title' onChange={(e) => setResumeTitle(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisibleSave} >Close</Button>
                    <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={saveResume}>Save</Button>
                </Modal.Actions>
            </Modal.Legacy>
            <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                <Modal.Header >
                    <p className="text-lg mb-0 border-b pb-4">Ai Content suggestions</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className='border border-slate-500 rounded-lg p-6 w-full mb-8'>
                        <p className='text-base mb-6'>About</p>
                        {
                            aboutAi.length > 0 ?
                                aboutAi.map((about, index) => (
                                    <div className='flex gap-4 mb-3' key={index}>
                                        <Checkbox
                                            checked={about.checked}
                                            color="primary"
                                            value={about.about}
                                            onClick={(e) => {
                                                setActive(e.target.value);
                                                changeMarkedCheckBox(about.id);
                                            }}
                                        />
                                        <Textarea onChange={(e) => setChangedAboutAi(e.target.value, about.id)} defaultValue={about.about} className='w-full bg-white' />
                                    </div>
                                ))
                                : ''
                        }

                    </div>

                    <div className='border border-slate-500 rounded-lg p-6 w-full'>
                        <p className='text-base mb-6'>Skills</p>
                        <div className='flex gap-8'>
                            {
                                skillsAi.length > 0 ?
                                    skillsAi.map((skill, index) => (
                                        <div className='flex gap-3 mb-3' key={index}>
                                            <Checkbox
                                                color="primary"
                                                checked={skill.checked}
                                                value={skill.skill}
                                                onClick={() => addCheckedSkill(skill.id)}
                                            />
                                            <p className='text-sm'>{skill.skill}</p>
                                        </div>
                                    ))
                                    : ''
                            }
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Actions>
                    <Button type="button" onClick={toggleVisible} >Close</Button>
                    <Button type="button" className="bg-[#F59E0B] text-white border-none">Save</Button>
                </Modal.Actions>
            </Modal.Legacy>
        </div>
    );
}

export default CreateResume;