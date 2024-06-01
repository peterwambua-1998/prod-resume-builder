'use client'
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { Divider } from "react-daisyui";

const Projects = ({ userId }) => {
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
            {projects.length > 0 ?
            <div>
            <p className="mb-2 font-bold">Projects</p>
                    <div>
                    {projects.map((project, index) => (
                        <div className="mb-8" key={index}>
                            <p className="text-amber-600 font-bold mb-2 text-lg">{project.title}</p>
                            <div className="pl-3 text-sm">
                                <ul style={{ listStyleType: 'disc' }}>
                                    <li>{project.description}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                    <Divider></Divider>
                    </div>
                    
            </div> : <div></div>
            }

        </div>
        
    );
}

export default Projects;