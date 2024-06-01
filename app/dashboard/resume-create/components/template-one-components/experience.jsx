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
            {
                experienceData.length > 0 ? <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Work Experience</p> : <div></div>
            }
            {
                experienceData.length > 0 ?
                experienceData.map((exp, index) => (
                    <div className="mt-5" key={index}>
                        <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">{exp.title}, {exp.companyName}</p>
                        <p className="text-[2%] md:text-sm lg:text-sm mb-2">{exp.location} ({exp.startDate} - {exp.endDate})</p>
                        <div className="pl-3">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="text-[5%] md:text-sm lg:text-sm">{exp.description}</li>
                            </ul>
                        </div>
                    </div>
                )): <div></div>
            }

            

           
        </div>
    );
}
 
export default ExperienceWidget;