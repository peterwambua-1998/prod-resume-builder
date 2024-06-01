import { useState, useEffect } from "react";
import { Button, Input, Modal, Badge } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import {  db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const SkillWidget = ({ skills}) => {
    return (  
        
        <div>
            {
                skills.length > 0 ?
                <div className="mb-5 p-2">
                    <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Skills</p>
                    <div className="flex justify-start mt-3">
                        <ul style={{ listStyleType: 'disc' }} className="text-[5px] md:text-base lg:text-base pl-5 pr-5">
                            {skills
                            .filter((skill) => skill.checked === true)
                            .map((skill) => (
                                <li key={skill.id}>{skill.skill}</li>
                            ))}
                        </ul>
                    </div>
                
                </div>: <div></div>
            }
        </div>
    );
}
 
export default SkillWidget;