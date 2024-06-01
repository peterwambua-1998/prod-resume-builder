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
            <div className="mt-8">
                <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Education</p>
                {eduData.map((edu, index) => (
                    // <div className="mt-5" key={index}>
                    //     <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">{edu.degree}, {edu.fieldStudy}</p>
                    //     <p className="text-[2%] md:text-sm lg:text-sm mb-2">{edu.school} ({edu.startDate} - {edu.endDate})</p>
                    //     <div className="pl-3">
                    //         <ul style={{ listStyleType: 'disc' }}>
                    //             <li className="text-[5%] md:text-base lg:text-base">{edu.descriptionEdu}</li>
                    //         </ul>
                    //     </div>
                    // </div>
                    <div className="pr-2 pl-2 md:pl-4 md:pr-4" key={index}>
                        <div className="mb-3 md:mb-6 lg:mb-6">
                            <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">{edu.degree}, {edu.fieldStudy}</p>
                            <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">{edu.school} ({edu.startDate} - {edu.endDate})</p>
                            <p className="text-[6px] md:text-[10px] lg:text-xs">
                                {edu.descriptionEdu}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
            


           
        </div>
    );
}
 
export default EducationWidget;