
import AboutMe from "./template-three-components/about";
import ExperienceWidget from "./template-three-components/experience";
import EducationWidget from "./template-three-components/education";
import SkillWidget from "./template-three-components/skills";
import References from "./template-three-components/references";
import { useEffect, useState } from "react";
import Internship from "./template-three-components/internship";
import Memberships from "./template-three-components/membership";
import Publications from "./template-three-components/publications";
import LinksUser from "./template-three-components/links";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import ProfilePhoto from "./template-three-components/profilePhoto";
import Projects from "./template-three-components/projects";
import Languages from "./template-three-components/languanges";
import Hobbies from "./template-three-components/hobbies";
import Award from "./template-three-components/achievements";
import GeneratePDF from "./template-three-components/generate-pdf";

const TemplateThree = ({ userId }) => {
    const [profile, setProfile] = useState(null);

    function getProfile() {
        try {
            onSnapshot(doc(db, 'profile', userId), doc => {
                if (doc.data()) {
                    setProfile(doc.data());
                } else {
                    setProfile(null);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getProfile();
    }, [])
    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
                <GeneratePDF userId={userId} />
            </div>
            <div className="bg-white p-10 border-t-4 border-amber-600">
                {/* cv header */}
                <div className="flex justify-between mb-4">
                    <ProfilePhoto userId={userId} />
                    <div className="text-center">
                        {
                            profile == null ? (<div>Loading...</div>) : (
                                <div>
                                    <h3 className="md:font-bold md:text-2xl mb-2">{profile.full_name}</h3>
                                    <p className="text-[#808080] text-sm mb-2">{profile.professionTitle}</p>
                                </div>
                            )
                        }
                    </div>
                    <div></div>
                </div>
                {/* cv header end */}
                {/* about me */}
                <AboutMe useId={userId} />
                {/* experience */}
                <ExperienceWidget user_id={userId} />
                {/* experience */}
                {/* Education */}
                <EducationWidget user_id={userId} />

                <Projects userId={userId} />

                <Publications userId={userId} />

                {/* Education */}
                <Internship userId={userId} />

                <Award userId={userId} />

                <LinksUser userId={userId} />

                {/* skills */}
                <SkillWidget user_id={userId} />
                {/* skills */}

                {/* languages */}
                <Languages userId={userId} />
                {/* languages */}


                {/* skills */}
                <Memberships userId={userId} />
                {/* skills */}
                {/* Links */}

                <Hobbies userId={userId} />

                {/* Links */}

               
                {/* referee */}
                <References userId={userId} />
                {/* referee */}
            </div>
        </div>
    );
}

export default TemplateThree;