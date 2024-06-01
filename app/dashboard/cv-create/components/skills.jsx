import { useState, useEffect } from "react";
import { Button, Input, Accordion, Badge } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebase";


const SkillWidget = ({ user_id }) => {
    const [visibleSkill, setVisibleSkill] = useState(false);
    var [skillName, setSkillName] = useState(null);
    var [skillNameError, setSkillNameError] = useState(null);
    var [skillLevel, setSkillLevel] = useState(null);
    var [skillLevelError, setSkillLevelError] = useState(null);
    var [skillData, setSkillData] = useState([]);

    const toggleVisibleSkill = () => {
        setVisibleSkill(!visibleSkill);
    };

    async function checkSkill(userId) {
        let skillRef = collection(db, 'skill');
        let q = query(skillRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setSkillData([]);
            doc.forEach((data) => {
                setSkillData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function addSkill() {
        console.log(skillName);
        if (skillName == null || !skillName) {
            setSkillNameError('field required');
            return;
        } else {
            setSkillNameError(null);
        }

        if (skillLevel == null || !skillLevel) {
            setSkillLevelError('field required');
            return;
        } else {
            setSkillLevelError(null);
        }


        try {
            let skillRef = collection(db, 'skill');
            await addDoc(skillRef, {
                name: skillName,
                user_id: user_id,
                skillLevel: skillLevel,
                created_at: Timestamp.now()

            });
        } catch (error) {
            console.log('system error please try again');
        }
    }

    useEffect(() => {
        checkSkill(user_id);
    }, [])

    return (

        <div className="mb-5 p-2">
            <Accordion className="bg-white border border-slate-400 text-black" icon="arrow">
                <Accordion.Title className="text-xl font-medium">
                    <p className="mb-2">Skills</p>
                    <p className="text-sm font-normal">Click to add skills</p>
                </Accordion.Title>
                <Accordion.Content>
                    <div className="flex gap-2 mb-2 items-center">
                        {skillData.map((edu, index) => (
                            <div key={index}>
                                <Badge className="p-4 bg-transparent text-black">{edu.name}</Badge>
                            </div>
                        ))}
                    </div>

                    <div className="form-control w-full grow">
                        <label className="label">
                            <span className="label-text">Add Skill</span>
                        </label>
                        <br />

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="label">
                                    <span className="label-text text-black">Skill</span>
                                </label>
                                <Input className="bg-white text-black w-full" placeholder="Ex: Databases" onChange={(e) => setSkillName(e.target.value)} />
                                <div className="text-red-600 text-sm">{skillNameError}</div>
                            
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-black">Skill Level (0 - 10)</span>
                                </label>
                                <Input className="bg-white text-black w-full" placeholder="Ex: 8" onChange={(e) => setSkillLevel(e.target.value)} />
                                <div className="text-red-600 text-sm">{skillLevelError}</div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={() => { addSkill() }}>Save</Button>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion>

        </div>
    );
}

export default SkillWidget;