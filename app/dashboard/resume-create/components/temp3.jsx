import { Skeleton } from "react-daisyui";

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
import Hobbies from "../../cv-create/proceed/templates/template-three-components/hobbies";
import Projects from "../../cv-create/proceed/templates/template-three-components/projects";
import ProfilePhoto from "../../cv-create/proceed/templates/template-three-components/profilePhoto";
import GeneratePDF from "./template-three-components/generate-pdf";

const TempThree = ({ userId, about, skills }) => {
    const [profile, setProfile] = useState(null);

    function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', userId), doc => {
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
                <GeneratePDF userId={userId} skillsAi={skills} aboutAI={about} />
            </div>
            <div  className="bg-white p-10 border-t-4 border-amber-600">
                {/* cv header */}
                <div className="flex justify-between mb-4">
                    {
                        profile == null ?
                            <Skeleton className="h-[40px] w-[40px] bg-slate-400 rounded-full"></Skeleton>
                            :
                            <ProfilePhoto userId={userId} />
                            // <Image alt="profile-photo" src={profile.file_url} width={80} height={80} className="rounded-full" />
                    }

                    <div className="text-=center">
                        {
                            profile == null ? (<div>Loading...</div>) : (
                                <div>
                                    <h3 className="md:font-bold md:text-xl mb-2">{profile.full_name}</h3>
                                    <p className="text-[#808080] text-sm mb-2">{profile.professionTitle}</p>
                                </div>

                            )
                        }

                        {/* <Profile userId={firebase_user.uid} /> */}
                    </div>
                    <div></div>
                </div>
                {/* cv header end */}
                {/* about me */}
                <AboutMe useId={userId} about={about} />
                {/* experience */}
                <ExperienceWidget user_id={userId} />
                {/* experience */}
                {/* Education */}
                <EducationWidget user_id={userId} />

                <Projects userId={userId} />

                <Publications userId={userId} />

                {/* Education */}
                <Internship userId={userId} />
                {/* skills */}
                <SkillWidget skills={skills} />
                {/* skills */}
                {/* skills */}
                <Memberships userId={userId} />
                {/* skills */}
                {/* Links */}

                <Hobbies userId={userId} />


                <LinksUser userId={userId} />


                {/* Links */}

                {/* Languages */}
                {/* Languages */}
                {/* referee */}
                <References userId={userId} />
                {/* referee */}
            </div>
        </div>
    );
}

export default TempThree;