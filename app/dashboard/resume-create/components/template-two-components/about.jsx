import { db } from "@/app/firebase/firebase";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "react-daisyui";

const AboutMe = ({ about }) => {

   

    return (
        <div className="p-2 md:p-5 lg:p-5">
            {
                about
                    .filter((skill) => skill.checked === true)
                    .map((skill) => (
                        <div  key={skill.id}>
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">About</p>
                            <p className="mt-3 text-[5px] md:text-sm lg:text-sm">{skill.about}</p>
                        </div>
                    ))
            }
            
        </div>
    );



}

export default AboutMe;