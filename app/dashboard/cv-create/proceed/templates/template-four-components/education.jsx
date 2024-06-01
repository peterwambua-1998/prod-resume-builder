import { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Textarea } from "react-daisyui";
import { collection, addDoc, query, where, onSnapshot, Timestamp } from "firebase/firestore"; 
import {  db } from "@/app/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";



const EducationWidget = ({user_id}) => {
    var [eduData, setEduData] = useState([]);
    

    async function checkEdu(userId) {
        let eduRef =  collection(db, 'education');
        let q =  query(eduRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setEduData([]);
            doc.forEach((data) => {
                setEduData((prev) => [...prev, data.data()]);
            })
        })
    }
    

    useEffect(() => {
        checkEdu(user_id);
    }, [])
   
    return (  
        <div className="mb-10">
            <p className="text-violet-900 font-bold">Education</p>
            {
                eduData.length > 0 ? (eduData.map((edu, index) => (
                    <div className="mt-2 mb-2" key={index}>
                        <p className="text-lg font-semibold">{edu.school}</p>
                        <p className="text-sm font-semibold text-[#475569]">{edu.startDate} - {edu.endDate}</p>
                        <p className="text-sm">{edu.descriptionEdu}</p>
                    </div>
                ))) : <div></div>
            }
        </div> 
    );
}
 
export default EducationWidget;