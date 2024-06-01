import { useState, useEffect } from "react";
import { Button, Input, Modal, Badge } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const SkillWidget = ({ user_id }) => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    var [skillName, setSkillName] = useState([]);
    var [skillNameError, setSkillNameError] = useState(null);
    var [skillData, setSkillData] = useState([]);

    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    async function checkSkill(userId) {
        let skillRef = collection(db, 'skill');
        let q = query(skillRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setSkillData([]);
            doc.forEach((data) => {
                let percentange = data.data()['skillLevel'];
                percentange = (percentange / 10) * 100;
                let d = { ...data.data(), 'percentange': percentange }
                setSkillData((prev) => [...prev, d]);
            })
        })

        console.log(skillData);
    }


    useEffect(() => {
        checkSkill(user_id);
    }, [])

    return (

        <div className="md:mt-8 md:pl-2 md:pr-2 lg:mt-8 lg:pl-4 lg:pr-4">
            <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 mb-2 md:mb-5 border-[#808080]">Skills</p>

            {skillData.map((skill, index) => (
                <div className="md:pl-2 md:pr-2 lg:pl-8 lg:pr-8" key={index}>
                    <div className="mb-1 md:mb-5">
                        <p className="font-semibold text-[5px] md:text-[10px] lg:text-sm tracking-wide">{skill.name}</p>
                        <div className="w-full bg-black rounded-full h-1 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                            <div className={"bg-[#4F46E5] h-1 md:h-1.8 lg:h-2.5 rounded-full w-[" + skill.percentange + "%]"}></div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default SkillWidget;