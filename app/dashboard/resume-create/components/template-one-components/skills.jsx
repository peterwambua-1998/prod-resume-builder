import { useState, useEffect } from "react";
import { Button, Input, Modal, Badge } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const SkillWidget = ({ skills }) => {
   
    return (
        <div className="mb-5">
            <div className="flex justify-center mb-2 text-[5px] md:text-base lg:text-base pt-2">
                <ul style={{ listStyleType: 'disc' }} className="text-black pl-10 pr-10 ">
                    {skills
                    .filter((skill) => skill.checked === true)
                    .map((skill) => (
                        <li key={skill.id}>{skill.skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SkillWidget;