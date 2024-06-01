'use client'
import { useEffect, useState } from "react";
import { Input,Textarea, Accordion, Badge, Button, Card } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase/firebase";


const Projects = ({userId}) => {
    const [projects, setProjects] = useState([]);
    const [projectValue, setProjectValue] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);

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


    async function addProject() {
        try {
            const data = {
                user_id: userId,
                title: projectValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }
            
            const collectionRef =  collection(db, 'project');
            const res = await addDoc(collectionRef, data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);

    if (projects.length < 1) {
        
    } else {
        return (  
            <div>
                <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Projects</p>
                {projects.map((project, index) => (
                <div className="mt-5" key={index}>
                    <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">{project.title}</p>
                    <div className="pl-3">
                        <p>{project.description}</p>
                    </div>
                </div>
                 ))}
    
            </div>
        );
    }

    
}
 
export default Projects;