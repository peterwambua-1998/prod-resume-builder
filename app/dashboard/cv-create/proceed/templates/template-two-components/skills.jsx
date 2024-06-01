import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import {  db } from "@/app/firebase/firebase";

const SkillWidget = ({user_id}) => {
    var [skillData, setSkillData] = useState([]);

    async function checkSkill(userId) {
        let skillRef =  collection(db, 'skill');
        let q =  query(skillRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setSkillData([]);
            doc.forEach((data) => {
                setSkillData((prev) => [...prev, data.data()]);
            })
        })
    }

    useEffect(() => {
        checkSkill(user_id);
    }, [])

    return (  
        <div>
            {
                skillData.length > 0 ?
                <div className="mb-5 p-2">
                    <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Skills</p>
                    <div className="flex justify-start mt-3">
                        <ul style={{ listStyleType: 'disc' }} className="text-[5px] md:text-base lg:text-base pl-5 pr-5">
                            {skillData.map((skill, index) => (
                                <li key={index}>{skill.name}</li>
                            ))}
                        </ul>
                    </div>
                </div> : <div></div>
            }
        </div>
    );
}
 
export default SkillWidget;