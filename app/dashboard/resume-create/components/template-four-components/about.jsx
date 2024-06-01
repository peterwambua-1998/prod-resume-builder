import { db } from "@/app/firebase/firebase";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "react-daisyui";

const AboutMe = ({ about }) => {
    return (
        <div >
            {
                about
                    .filter((skill) => skill.checked === true)
                    .map((skill) => (
                        <p className="text-sm" key={skill.id}>{skill.about}</p>
                    ))
            }
        </div>
    );
}

export default AboutMe;