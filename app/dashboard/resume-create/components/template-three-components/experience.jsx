import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import { db } from "@/app/firebase/firebase";
import { Divider } from "react-daisyui";

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
                experienceData.length > 0 ? 
                <div>
                <p className="mb-2 font-bold">Experience</p>
                {experienceData.map((exp, index) => (
                    <div className="mb-8" key={index}>
                        <p className="text-amber-600 font-bold mb-2 text-lg">{exp.title}, {exp.companyName}</p>
                        <p className="text-sm mb-2">{exp.location} ({exp.startDate} - {exp.endDate})</p>
                        <div className="pl-3">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li>{exp.description}</li>
                            </ul>
                        </div>
                    </div>
                ))}
                <Divider></Divider>
                </div>
                : <div></div>
            }
           
        </div>
    );
}
 
export default ExperienceWidget;