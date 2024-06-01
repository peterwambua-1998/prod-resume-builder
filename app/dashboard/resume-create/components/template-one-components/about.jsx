'use client'

const AboutMe = ({ about }) => {

    return (
        <div className="">
            {
                about
                    .filter((skill) => skill.checked === true)
                    .map((skill) => (
                        <div className="show-selected-skills" key={skill.id}>
                            <p className="text-[8px] md:text-sm lg:text-sm ">{skill.about}</p>
                        </div>
                    ))
            }
        </div>
    );
}

export default AboutMe;