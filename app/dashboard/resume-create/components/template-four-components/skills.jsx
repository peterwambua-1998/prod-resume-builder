import { useState, useEffect } from "react";
import { Button, Input, Modal, Badge } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import {  db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const SkillWidget = ({skills}) => {

    return (  
        <div className="flex gap-2 flex-wrap text-sm">
            {skills
                .filter((skill) => skill.checked === true)
                .map((skill, index) => (
                    <span key={index} className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">{skill.skill}</span>
                ))
            }
        </div>
        
    );
}
 
export default SkillWidget;