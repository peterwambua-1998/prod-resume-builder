import { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Textarea, Divider } from "react-daisyui";
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
                eduData.length > 0 ? 
                <div>
                    <p className="mb-2 font-bold">Education</p>
                    {eduData.map((edu, index) => (
                    <div className="mb-8" key={index}>
                        <p className="text-amber-600 font-bold mb-2 text-lg">{edu.degree}, {edu.fieldStudy}</p>
                        <p className="text-sm mb-2">{edu.school} ({edu.startDate} - {edu.endDate})</p>
                        <div className="pl-3 text-sm">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li>{edu.descriptionEdu}</li>
                            </ul>
                        </div>
                    </div>
                    ))}
                <Divider></Divider>
                </div> : <div></div>
            }
            
        </div>
    );
}
 
export default EducationWidget;