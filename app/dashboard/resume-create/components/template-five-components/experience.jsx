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
        <div>
            <div className="mt-8">
                <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Work Experience</p>
                {experienceData.map((exp, index) => (
                    
                    <div className="pr-2 pl-2 md:pl-4 md:pr-4" key={index}>
                        <div className="mb-3 md:mb-6 lg:mb-6">
                            <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">{exp.title}, {exp.companyName}</p>
                            <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">{exp.location} ({exp.startDate} - {exp.endDate})</p>
                            <p className="text-[6px] md:text-[10px] lg:text-xs">
                            {exp.description}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
 
export default ExperienceWidget;