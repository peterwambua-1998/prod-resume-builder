'use client'
import { useEffect, useState } from 'react';
import { Accordion, Alert, Button, Checkbox, Input, Loading, Modal, Range, Textarea } from 'react-daisyui';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/firebase';
import Image from 'next/image';
import resumeImage from '@/app/images/peter2.png';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import ProfileDetails from '../../cv-create/proceed/templates/add-edit/profile';
import ExperienceAddEdit from '../../cv-create/proceed/templates/add-edit/experience';
import EducationAddEdit from '../../cv-create/proceed/templates/add-edit/education';
import AwardAddEdit from '../../cv-create/proceed/templates/add-edit/awards';
import ReferencesEditDelete from '../../cv-create/proceed/templates/add-edit/references';
import HobbiesAddEdit from '../../cv-create/proceed/templates/add-edit/hobbies';
import Languages from '../../cv-create/proceed/templates/add-edit/languages';
import LinksUser from '../../cv-create/proceed/templates/add-edit/links';
import ProjectsAddEdit from '../../cv-create/proceed/templates/add-edit/projects';
import Internship from '../../cv-create/proceed/templates/add-edit/internships-volunteer-work';
import Memberships from '../../cv-create/proceed/templates/add-edit/membership';
import Publications from '../../cv-create/proceed/templates/add-edit/publications';
import Wrapper from '../../resume-create/components/wrapper';


const CreateResume = ({ params }) => {
    // used to store ids for the document
    const [resumeId, setResumeId] = useState(null);
    const [aboutAiSaved, setAboutAiSaved] = useState(null);
    let [skillAiSaved, setSkillAiSaved] = useState([]);

    const [resumeTitle, setResumeTitle] = useState(null);
    const [queryingForJobDesc, setQueryForJobDesc] = useState(true);
    const [showJobDescriptionInput, setShowJobDescriptionInput] = useState(false);
    const [jobDescription, setJobDescription] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const [visible, setVisible] = useState(false);
    const [visibleSave, setVisibleSave] = useState(false);
    let [aboutAi, setAboutAi] = useState([]);

    let [skillsAi, setSkillsAi] = useState([])

    const [activeAbout, setActiveAbout] = useState(null);
    const [activeSkills, setActiveSkills] = useState([]);

    const [showSaveAlert, setShowSaveAlert] = useState(false);

    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
    });


    const toggleVisible = () => {
        setVisible(!visible);
    };

    const toggleVisibleSave = () => {
        setShowSaveAlert(false);
        setVisibleSave(!visibleSave);
    };

    async function getAboutAi() {
        //get users about me
        setQueryForJobDesc(true);
        let exps = 'i would like a well crafted and creative about me based on job description. My current about ';
        const docRef = doc(db, "about", firebase_user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let about = docSnap.data()['description'];
            exps += `${about}.`;
        }


        exps += `Job description is ${jobDescription}`;

        // get users experiences
        exps += "my experiences are ";
        const q = query(collection(db, "experience"), where("user_id", "==", firebase_user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.title} ${res.companyName} - ${res.employmentType} ${res.startDate} - ${res.endDate} ${res.location} - ${res.locationType} ${res.description}.`;
        });

        // get users skills
        exps += 'my skills include ';
        let skills = [];
        const qS = query(collection(db, "skill"), where("user_id", "==", firebase_user.uid));
        const querySnapshotS = await getDocs(qS);
        querySnapshotS.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.name},`;
        });


        // languages
        exps += 'languages i speak include ';
        const qL = query(collection(db, "languages"), where("user_id", "==", firebase_user.uid));
        const querySnapshotL = await getDocs(qL);
        querySnapshotL.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.name},`;
        });

        //hobbies
        let hobbies = [];
        exps += 'I also have hobbies like ';
        const qH = query(collection(db, "hobbies"), where("user_id", "==", firebase_user.uid));
        const querySnapshotH = await getDocs(qH);
        querySnapshotH.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let res = doc.data();
            exps += `${res.title},`;
        });

        exps += ' Be creative in making the about wordings mix things up and give me two versions that is version-1 version-2. Also recommend additions skills as recommended-skills';


        const options = {
            method: 'POST',
            body: JSON.stringify({
                "userContent": exps,
            }),
        };

        try {
            let aboutAI = await fetch('/api/open-ai', options);
            let res = await aboutAI.json();

            let resAiAbout = [
                { id: 1, checked: false, about: res['version-1'] },
                { id: 2, checked: false, about: res['version-2'] }
            ]
            let resAiSkills = res['recommended-skills'];
            let resAiSkillsFormarted = [];
            let skillId = 1;
            for (let i = 0; i < resAiSkills.length; i++) {
                let inner = { id: skillId, skill: resAiSkills[i], checked: false, level: 0 };
                resAiSkillsFormarted.push(inner);
                skillId++;
            }
            setAboutAi(resAiAbout);
            setSkillsAi(resAiSkillsFormarted);
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(false);
            toggleVisible();
            checkSkill(skillId);
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

    function updateSkillRage(id, range) {
        const updatedCheckboxes = skillsAi.map((checkbox) => {
            return checkbox.id === id ? { ...checkbox, level: Number(range) } : checkbox
        });
        setSkillsAi(updatedCheckboxes);
    }

    function changeMarkedCheckBox(id) {
        const updatedCheckboxes = aboutAi.map((checkbox) => {
            return checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : { ...checkbox, checked: false }
        });
        setAboutAi(updatedCheckboxes);
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
        toggleVisibleSave();
    }

    async function checkSkill(skillId) {
        let id = skillId;
        id++;
        let skillRef = collection(db, 'skill');
        let q = query(skillRef, where("user_id", "==", firebase_user.uid));
        onSnapshot(q, (doc) => {
            doc.forEach((data) => {
                let d = data.data();
                let level = (d['skillLevel'] / 10) * 100;
                let sk = { id: id, checked: false, skill: d['name'], level: level }
                setSkillsAi((prev) => [...prev, sk]);
                id++;
            })
        })
    }

    // check if the resume is already saved
    async function checkIfResumeIsSaved() {
        // get resume by id
        try {
            let resumeRef = doc(db, 'users-resumes', params.id);
            const res = await getDoc(resumeRef);
            let data = res.data();
            if (res) {
                let description = data['jobDescription'];
                if (description) {
                    // delete previous saved data
                    const q = query(collection(db, "user-resume-ai-suggestions"), where("resume_id", "==", params.id));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach(async (data) => {
                        if (data.data()) {
                            await deleteDoc(doc(db, 'user-resume-ai-suggestions', data.id));
                        }
                    });

                    const qT = query(collection(db, "user-resume-ai-suggestions-skills"), where("resume_id", "==", params.id));
                    const querySnapshotT = await getDocs(qT);
                    querySnapshotT.forEach(async (data) => {
                        if (data.data()) {
                            await deleteDoc(doc(db, 'user-resume-ai-suggestions-skills', data.id));
                        }
                    });
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // determine if it has jo description first before even showing it
    async function detJobDesc() {
        const docRef = doc(db, "users-resumes", params.id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data.jobDescription === null) {
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(true);
        } else {
            // get the data from firestore and show resume as it was saved
            await getResumeDataAsItWas();
            setQueryForJobDesc(false);
            setShowJobDescriptionInput(false);
        }
    }

    async function getResumeDataAsItWas() {
        try {
            //resume title
            let resumeRef = doc(db, 'users-resumes', params.id);
            let res = await getDoc(resumeRef);
            let data = res.data();
            if (data) {
                setResumeTitle(data['title']);
                setJobDescription(data['jobDescription'])
            }

            // get about from firestore
            const q = query(collection(db, "user-resume-ai-suggestions"), where("resume_id", "==", params.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    let data = doc.data();
                    let d = [
                        { id: data.about_one_id, checked: data.about_one_checked, about: data.about_one_about },
                        { id: data.about_two_id, checked: data.about_two_checked, about: data.about_two_about },
                    ]
                    setAboutAi(d);
                }
            });

            // get skills
            const qT = query(collection(db, "user-resume-ai-suggestions-skills"), where("resume_id", "==", params.id));
            const querySnapshotT = await getDocs(qT);
            setSkillsAi([]);
            querySnapshotT.forEach((doc) => {
                if (doc.data()) {
                    let data = doc.data();
                    setSkillsAi((prev) => [...prev, { id: data.skill_id, checked: data.skill_checked, skill: data.skill, level: data.level }])
                    setSkillAiSaved(prev => [...prev, doc.id]);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    async function saveResume() {
        // check if there is recent save if setSkillAiSaved has data
        let deletes = await checkIfResumeIsSaved();
        if (deletes) {
            //save resume at current state including ai suggestions including resume name
            try {
                let resumeRef = doc(db, 'users-resumes', params.id);
                let aiSuggestionsRef = collection(db, 'user-resume-ai-suggestions');
                let aiSuggestionsSkillsRef = collection(db, 'user-resume-ai-suggestions-skills');
                const res = await updateDoc(resumeRef, {
                    'title': resumeTitle,
                    'jobDescription': jobDescription,
                });

                const aboutAiAboutResponse = await addDoc(aiSuggestionsRef, {
                    'resume_id': params.id,
                    'about_one_id': aboutAi[0].id,
                    'about_one_about': aboutAi[0].about,
                    'about_one_checked': aboutAi[0].checked,
                    'about_two_id': aboutAi[1].id,
                    'about_two_about': aboutAi[1].about,
                    'about_two_checked': aboutAi[1].checked,
                });

                setAboutAiSaved(aboutAiAboutResponse.id);

                skillsAi.forEach(async (skill, index) => {
                    let skillAdds = await addDoc(aiSuggestionsSkillsRef, {
                        'resume_id': params.id,
                        'skill': skill.skill,
                        'skill_id': skill.id,
                        'skill_checked': skill.checked,
                        'level': skill.level
                    });

                    setSkillAiSaved(prev => [...prev, skillAdds.id]);
                });

                setShowSaveAlert(true);

            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        detJobDesc();
    }, []);

    return (
        <div className='my-resume-bg h-[90vh]'>
            {
                queryingForJobDesc ?
                    <div className='flex min-h-screen items-center justify-center flex-col'>
                        <p>Getting your resume ready, hang on!</p>
                        <Loading />
                    </div>
                    :
                    showJobDescriptionInput ?
                        // job desc input
                        <div className='pl-8 pr-8 flex flex-col gap-8 items-center'>
                            <Image src={resumeImage} alt='ai-resume' width={520} height={520} className='w-[36vw] h-[35vh] md:w-[18vw] md:h-[36vh]' />
                            <div className='w-full text-center'>
                                <p className='font-semibold mb-4'>Welcome, spark up your resume</p>
                                <p className='text-black/50 mb-4'>Enter job description below</p>

                                <div className='
                                overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full flex-grow relative border rounded-2xl bg-token-main-surface-primary border-token-border-medium
                                '>
                                    <Textarea placeholder='Job description...' onChange={(e) => setJobDescription(e.target.value)} className='h-[20vh] 
                                    m-0 w-full resize-none border-0 bg-white focus:ring-0 focus-visible:ring-0  py-[10px] pr-10 md:py-3.5 md:pr-12 placeholder-black/50 pl-4 md:pl-6
                                    ' />
                                    {/* <Input onChange={(e) => setJobDescription(e.target.value)} type='text' className='w-full bg-transparent border-none rounded-none' placeholder='Enter job description here...' /> */}
                                    <Button className='
                                    absolute bottom-1.5 right-2 rounded-lg border border-black bg-black p-0.5 text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10  md:bottom-3 md:right-3
                                    ' onClick={getAboutAi}>submit</Button>
                                </div>
                            </div>
                        </div>
                    :
                    <div className="md:grid md:grid-cols-4 bg-slate-200 ">
                        <div className="bg-white h-[30vh] overflow-y-auto md:h-[100%] pt-10 pl-5 pr-5">
                            <Button className='bg-green-300 hover:bg-green-400 text-black w-full mb-3' onClick={initiateSave}>Save Resume</Button>
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
                            <AwardAddEdit userId={firebase_user.uid} />
                            <ReferencesEditDelete userId={firebase_user.uid} />
                            <HobbiesAddEdit userId={firebase_user.uid} />
                            <Languages userId={firebase_user.uid} />
                            <LinksUser userId={firebase_user.uid} />
                            <ProjectsAddEdit userId={firebase_user.uid} />
                            <Internship userId={firebase_user.uid} />
                            <Memberships userId={firebase_user.uid} />
                            <Publications userId={firebase_user.uid} />
                        </div>
                        <div className="md:col-span-3 pl-4 pr-4 md:pl-6 md:pr-6 pt-2 pb-2">
                            <Wrapper userId={firebase_user.uid} about={aboutAi} skills={skillsAi} />
                        </div>

                        <Modal.Legacy open={visibleSave} className="bg-white max-w-5xl">
                            <Modal.Header >
                                <p className="text-lg mb-0 border-b pb-4">Save Resume</p>
                            </Modal.Header>
                            <Modal.Body className="p-0">
                                {
                                    showSaveAlert ?
                                        <Alert icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>}>
                                            <span>Document saved!</span>
                                        </Alert> : <div></div>
                                }
                                <div>
                                    <label className="label">Resume Title</label>
                                    <Input className='bg-white w-full' placeholder='Ex: Job title' defaultValue={resumeTitle} onChange={(e) => setResumeTitle(e.target.value)} />
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
                                                        onChange={() => ''}
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
                                    <div className='grid grid-cols-2'>
                                        {
                                            skillsAi.length > 0 ?
                                                skillsAi.map((skill, index) => (
                                                    <div key={index} className='grid grid-cols-2'>
                                                        <div className='flex gap-3 mb-3' >
                                                            <Checkbox
                                                                color="primary"
                                                                checked={skill.checked}
                                                                value={skill.skill}
                                                                onClick={() => addCheckedSkill(skill.id)}
                                                                onChange={() => ''}
                                                            />
                                                            <p className='text-sm'>{skill.skill}</p>
                                                        </div>
                                                        <div className='w-[70%]'>
                                                            <Range defaultValue={skill.level} size='sm' onChange={(e) => updateSkillRage(skill.id, e.target.value)} />
                                                        </div>
                                                    </div>
                                                ))
                                                : ''
                                        }
                                    </div>
                                    <div className='flex gap-8 flex-wrap'>

                                    </div>

                                </div>
                            </Modal.Body>
                            <Modal.Actions>
                                <Button type="button" onClick={toggleVisible} >Close</Button>
                            </Modal.Actions>
                        </Modal.Legacy>
                    </div>
            }

        </div>
    );
}

export default CreateResume;