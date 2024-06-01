'use client'

import { useEffect, useState } from "react";

const SkillWidget = ({skills}) => {
    const [sk, setSk] = useState(skills);

    useEffect(() => {
        setSk(skills);
    },[skills])

    return (  
            <div className="md:mt-8 md:pl-2 md:pr-2 lg:mt-8 lg:pl-4 lg:pr-4">
                <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 mb-2 md:mb-5 border-[#808080]">Skills</p>
                
                {sk
                .filter((skill) => skill.checked === true)
                .map((skill, index) => (
                    <div className="md:pl-2 md:pr-2 lg:pl-8 lg:pr-8" key={index}>
                        <div className="mb-1 md:mb-5">
                            <p className="font-semibold text-[5px] md:text-[10px] lg:text-sm tracking-wide">{skill.skill}</p>
                            <div className="w-full bg-black rounded-full h-1 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                <div style={{width: `${skill.level}%`}} className={`bg-[#4F46E5] h-1 md:h-1.8 lg:h-2.5 rounded-full`}></div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
    );
}
 
export default SkillWidget;