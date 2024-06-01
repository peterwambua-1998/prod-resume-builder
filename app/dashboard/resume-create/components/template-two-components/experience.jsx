import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import { db } from "@/app/firebase/firebase";

const ExperienceWidget = ({user_id}) => {
    var [experienceData, setExperienceData] = useState([]);
    
    

    async function checkExperience(userId) {
        let experienceRef =  collection(db, 'experience');
        let q =  query(experienceRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setExperienceData([]);
            doc.forEach((data) => {
                setExperienceData((prev) => [...prev, data.data()]);
            })
        })
    }

   

    useEffect(() => {
        checkExperience(user_id);
    }, [])

    
    return (  
        <div className="p-2 md:p-[5%] lg:p-[5%]">
            <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Experience</p>
            {experienceData.map((exp, index) => (
            <div className="flex text-black" key={index}>
                <div className="mb-8 ">
                    <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">{exp.title}, {exp.companyName}</p>
                    <p className="text-[3px] md:text-sm lg:text-sm mb-2">{exp.location} ({exp.startDate} - {exp.endDate})</p>
                    <div className="text-[5px] md:text-sm lg:text-sm">
                        <p>{exp.description}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
}
 
export default ExperienceWidget;