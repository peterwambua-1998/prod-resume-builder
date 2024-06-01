import { db } from "@/app/firebase/firebase";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Divider, Skeleton } from "react-daisyui";

const AboutMe = ({ about }) => {
    return (
        <div>
            {
                about
                    .filter((skill) => skill.checked === true)
                    .map((skill) => (
                        <div  key={skill.id}>
                            <p className="mb-2 font-bold">About</p>
                            <p className="text-sm">{skill.about}</p>
                            <Divider></Divider>
                        </div>
                    ))
            }
            
        </div>
    );
}

export default AboutMe;