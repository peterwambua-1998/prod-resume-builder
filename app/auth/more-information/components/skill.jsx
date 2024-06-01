import { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Textarea } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase/firebase";

const SkillWidget = ({user_id}) => {
    const [visibleSkill, setVisibleSkill] = useState(false);
    var [skillName, setSkillName] = useState([]);
    var [skillNameError, setSkillNameError] = useState(null);
    var [skillLevel, setSkillLevel] = useState(null);
    var [skillLevelError, setSkillLevelError] = useState(null);
    var [skillData, setSkillData] = useState([]);

    const toggleVisibleSkill = () => {
        setVisibleSkill(!visibleSkill);
    };

    async function checkSkill() {
        let skillRef =  collection(db, 'skill');
        let q =  query(skillRef, where("user_id", "==", user_id));
        onSnapshot(q, (doc) => {
            setSkillData([]);
            doc.forEach((data) => {
                setSkillData((prev) => [...prev, data.data()]);
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
            setSkillLevelError('field required');
            return;
        } else {
            setSkillLevelError(null);
        }
        
        try {
            let skillRef =  collection(db, 'skill');
            await addDoc(skillRef, {
                name: skillName,
                user_id: user_id,
                level: skillLevel,
                created_at: Timestamp.now()
            });
        } catch (error) {
            console.log('system error please try again');
        }
    }

    useEffect(() => {
        checkSkill();
    }, [])

    return (  
        
        <div>
            <div className="pl-[5%] pr-[5%] pt-[5%]  pb-[5%] md:pl-[15%] md:pr-[15%] md:pt-[2%] md:pb-[2%] lg:pl-[15%] lg:pr-[15%]">
                <div className="p-2 md:p-5 lg:p-5 bg-amber-200 w-full rounded-md">
                    <div className="flex justify-between">
                        <p className="text-sm md:text-lg font-bold">Skills</p>
                        <Button onClick={toggleVisibleSkill} className="text-lg rounded-full">+</Button>
                    </div>
                    <div className="mt-3 text-xs md:text-base lg:text-base">
                        <p>Add skills to level up your resume</p>
                    </div>
                    { 
                        skillData != null ? 
                        (<div>
                            {skillData.map((edu, index) => (
                                <div className="text-black" key={index}>
                                    {edu.name}
                                </div>
                            ))}
                        </div>) 
                        : 
                        (<div></div>)
                    }
                </div>
            </div>

            <Modal.Legacy open={visibleSkill} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Skill</Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                            <div className="flex w-full items-center justify-start gap-2 mb-3">
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text text-black">Skill</span>
                                    </label>
                                    
                                    <Input className="bg-white text-black" placeholder="Ex: Databases" onChange={(e) => setSkillName(e.target.value)} />
                                    <div className="text-red-600 text-sm">{skillNameError}</div>
                                    <br />

                                    <label className="label">
                                        <span className="label-text text-black">Skill Level (0 - 10)</span>
                                    </label>
                                    <Input className="bg-white text-black" placeholder="Ex: 8" onChange={(e) => setSkillLevel(e.target.value)} />
                                    <div className="text-red-600 text-sm">{skillLevelError}</div>
                                    <br />

                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleSkill} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => addSkill()}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}
 
export default SkillWidget;