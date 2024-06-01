'use client'
const AboutMe = ({ about }) => {
   
    return (
        <div className="mt-2 md:mt-4 lg:mt-8">
             {
                about
                    .filter((skill) => skill.checked === true)
                    .map((skill) => (
                        <p className="text-[5px] md:text-[10px] lg:text-xs text-[#808080]" key={skill.id}>{skill.about}</p>
                    ))
            }
        </div>
    );

}

export default AboutMe;