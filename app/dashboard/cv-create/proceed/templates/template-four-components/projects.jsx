'use client'
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

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
            {
                projects.length > 0 ?
                    <div className="mb-10">
                        <p className="text-violet-900 font-bold">Projects</p>
                        {(projects.map((project, index) => (
                            <div className="mt-2 mb-2" key={index}>
                                <p className="text-lg font-semibold">{project.title}</p>
                                <p className="text-sm"> {project.description}</p>
                            </div>
                        )))}
                    </div>
                    : <div></div>
            }

        </div>
    );
}

export default Projects;