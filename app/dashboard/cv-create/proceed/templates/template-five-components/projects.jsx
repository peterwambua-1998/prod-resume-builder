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
            {projects.length > 0 ? 
            <div className="mt-8">
                <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Projects</p>
                
                    {projects.map((project, index) => (
                    <div className="pr-2 pl-2 md:pl-4 md:pr-4" key={index}>
                        <div className="mb-3 md:mb-6 lg:mb-6">
                            <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">{project.title}</p>
                            <p className="text-[6px] md:text-[10px] lg:text-xs">
                                {project.description}
                            </p>
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
{/* <div className="mt-8">
                        <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Work Experience</p>
                        <div className="pr-2 pl-2 md:pl-4 md:pr-4">
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">Business Consultant</p>
                                <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">Google inc - (2017 - 2022)</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
                                </p>
                            </div>
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">Business Consultant</p>
                                <p className="text-[5px] md:text-[8px] lg:text-xs text-[#808080] mb-2">Google inc - (2017 - 2022)</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
                                </p>
                            </div>
                        </div>

                    </div> */}