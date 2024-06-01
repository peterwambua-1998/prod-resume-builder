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

        <div className="mb-10">
            <p className="text-violet-900 font-bold">Experience</p>
            {
                experienceData.length > 0 ? (experienceData.map((exp, index) => (
                    <div className="mt-2 mb-2" key={index}>
                        <p className="text-lg font-semibold">{exp.title} <span className="text-[#808080]">@ {exp.companyName}</span></p>
                        <p className="text-sm font-semibold text-[#475569]">{exp.location} ({exp.startDate} - {exp.endDate})</p>
                        <p className="text-sm"> {exp.description}</p>
                    </div>
                ))) : <div></div>
            }
        </div>

           
    );
}
 
export default ExperienceWidget;