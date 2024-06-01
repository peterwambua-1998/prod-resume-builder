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
            <div className="md:grid md:grid-cols-5 mt-10">
                <div className="col-span-1 pl-2 mb-5">
                </div>
                <div className="col-span-4 pl-10 mb-5">
                    <p className="font-bold text-lg  border-b">Experience</p>
                </div>
            </div>
                    
                {
                experienceData.length > 0 ? (experienceData.map((exp, index) => (
                    <div className="md:grid md:grid-cols-5 mt-2" key={index}>
                        <div className="col-span-1 pl-2 text-right mb-6">
                            <p>{exp.title}, {exp.companyName}</p>
                            <p className="text-xs text-[#808080]">{exp.location} ({exp.startDate} - {exp.endDate})</p>
                        </div>
                        <div className="col-span-4 pl-10 mb-6">
                            <p>{exp.title}</p>
                            <p className="text-sm text-[#808080]">{exp.description}</p>
                        </div>
                    </div>
                ))) : 
                    <div></div>
                
                }

        </div> 

           
    );
}
 
export default ExperienceWidget;