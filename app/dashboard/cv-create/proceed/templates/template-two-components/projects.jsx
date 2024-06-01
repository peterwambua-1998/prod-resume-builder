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
            {projects.length > 0 ?
                <div className=" p-2 md:p-5 lg:p-5">

                    <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Projects</p>
                    
                        {projects.map((project, index) => (
                            <div className="flex  text-black" key={index}>
                                <div className="mb-8 ">
                                    <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">{project.title}</p>
                                    <div className="text-[5px] md:text-sm lg:text-sm">
                                        <p>{project.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                :
                <div></div>
            }
        </div>

    );
}

export default Projects;