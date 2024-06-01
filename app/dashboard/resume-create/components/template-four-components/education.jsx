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
            <div className="md:grid md:grid-cols-5 mt-10">
                <div className="col-span-1 pl-2 mb-5">
                </div>
                <div className="col-span-4 pl-10 mb-5">
                    <p className="font-bold text-lg  border-b">Education</p>
                </div>
            </div>
                    
                {
                eduData.length > 0 ? (eduData.map((edu, index) => (
                    <div className="md:grid md:grid-cols-5 mt-2" key={index}>
                        <div className="col-span-1 pl-2 text-right mb-6">
                            <p>{edu.school}</p>
                            <p className="text-xs text-[#808080]">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <div className="col-span-4 pl-10 mb-6">
                            <p>{edu.degree}, {edu.fieldStudy}</p>
                            <p className="text-sm text-[#808080]">{edu.descriptionEdu}</p>
                        </div>
                    </div>
                ))) : <div></div>
                }

        </div>  
           
    );
}
 
export default EducationWidget;