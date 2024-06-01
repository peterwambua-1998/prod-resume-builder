import { useState, useEffect } from "react";
import { Button, Input, Modal, Badge, Divider } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const SkillWidget = ({ skills }) => {

    return (
        <div>
             {
                skills.length > 0 ?
                <div>
                    <p className="mb-2 font-bold">Skills</p>
                    <div className="flex gap-4">
                        {skills
                            .filter((skill) => skill.checked === true)
                            .map((skill) => (
                                <Badge className="p-4 bg-amber-600 text-black" key={skill.id}>{skill.skill}</Badge>
                            ))
                        }
                    </div>
                    <Divider></Divider>
                </div>
                : <div></div>
            }
            
        </div>
    );
}

export default SkillWidget;