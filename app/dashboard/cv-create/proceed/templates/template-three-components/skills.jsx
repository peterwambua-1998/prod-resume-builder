import { useState, useEffect } from "react";
import { collection, addDoc, query, where, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { Badge, Divider } from "react-daisyui";


const SkillWidget = ({ user_id }) => {
    var [skillData, setSkillData] = useState([]);

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
   

    useEffect(() => {
        checkSkill(user_id);
    }, [])

    return (
        <div>
            {
                skillData.length > 0 ?
                <div>
                    <p className="mb-2 font-bold">Skills</p>
                    <div className="flex gap-4 flex-wrap">
                        {skillData.map((skill, index) => (
                            <Badge className="p-4 bg-amber-600 text-black" key={index}>{skill.name}</Badge>
                        ))}
                    </div>
                    <Divider></Divider>
                </div>
                : 
                <div></div>
            }
        </div>
    );
}

export default SkillWidget;