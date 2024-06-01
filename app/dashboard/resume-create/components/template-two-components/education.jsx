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

        <div className="p-2 md:p-5 lg:p-5">
            <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Education</p>
            {eduData.map((edu, index) => (
            <div className="flex  text-black" key={index}>
                <div className="mb-8 ">
                    <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">{edu.degree}, {edu.fieldStudy}</p>
                    <p className="text-[3px] md:text-sm lg:text-sm mb-2">{edu.school} ({edu.startDate} - {edu.endDate})</p>
                    <div className="text-[5px] md:text-sm lg:text-sm">
                        <p>{edu.descriptionEdu}</p>
                    </div>
                </div>
            </div>
            ))}
            
        </div>
    
    );
}
 
export default EducationWidget;