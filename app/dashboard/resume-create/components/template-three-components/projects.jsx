'use client'
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import {  db } from "@/app/firebase/firebase";

const Projects = ({userId}) => {
    const [projects, setProjects] = useState([]);

    function getProjects() {
        try {
            let awardsRef = collection(db, 'project');
            let q = query(awardsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setProjects([]);
                docs.forEach(doc => {
                    setProjects(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);

    
    return (  
        <div>
            <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Projects</p>
            {projects.length > 0 ? 
                projects.map((project, index) => (
                <div className="mt-5" key={index}>
                    <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">{project.title}</p>
                    <div className="pl-3">
                        <p>{project.description}</p>
                    </div>
                </div>
                ))
                :
                <div className="text-[#808080] mb-5">You currently have no projects saved</div>
            }
        </div>
    );
}
 
export default Projects;