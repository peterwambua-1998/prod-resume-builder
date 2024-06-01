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
        <div>
            {
                eduData.length > 0 ? <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Education</p> : <div></div>
            }
            {
                eduData.length > 0 ?
                eduData.map((edu, index) => (
                    <div className="mt-5" key={index}>
                        <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">{edu.degree}, {edu.fieldStudy}</p>
                        <p className="text-[2%] md:text-sm lg:text-sm mb-2">{edu.school} ({edu.startDate} - {edu.endDate})</p>
                        <div className="pl-3">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="text-[5%] md:text-sm lg:text-sm">{edu.descriptionEdu}</li>
                            </ul>
                        </div>
                    </div>
                )) : <div></div>
            }

        </div>
    );
}
 
export default EducationWidget;