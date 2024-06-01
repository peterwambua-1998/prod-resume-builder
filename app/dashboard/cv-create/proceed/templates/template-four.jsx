import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocation, faPhone } from "@fortawesome/free-solid-svg-icons";
import AboutMe from "./template-four-components/about";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { Skeleton } from 'react-daisyui';
import ExperienceWidget from "./template-four-components/experience";
import EducationWidget from "./template-four-components/education";
import Projects from "./template-four-components/projects";
import Internship from "./template-four-components/internship";
import Publications from "./template-four-components/publications";
import LinksUser from "./template-four-components/links";
import SkillWidget from "./template-four-components/skills";
import Languages from "./template-four-components/languages";
import Memberships from "./template-four-components/membership";
import Hobbies from "./template-four-components/hobbies";
import References from "./template-four-components/references";
import GeneratePDF from "./template-four-components/generate-pdf";


const TemplateFour = ({ userId }) => {
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
            <div className="w-full flex flex-row-reverse mb-4">
                <GeneratePDF userId={userId} />
            </div>
            <div>
                <div className="bg-white p-5">
                    {/* <!-- name and role --> */}
                    <div className="flex gap-4">
                        <div className="w-[2%] bg-violet-900"></div>
                        <div>
                            {
                                profile !== null ? <p className="text-3xl font-bold">{profile.full_name}</p> : <p></p>
                            }
                        </div>
                    </div>
                    <div className="mt-4 pb-2 border-b border-slate-400">
                        {
                            profile !== null ? <p className="text-violet-900">{profile.professionTitle}</p> : <p></p>
                        }
                    </div>
                    {/* <!-- name and role --> */}

                    {/* <!-- contact --> */}
                    <div className="mt-4">
                        <p className="text-sm text-[#808080] font-bold">CONTACT</p>
                        {
                            profile == null ? 
                            <div className="grid grid-cols-3 text-sm mt-2">
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-10 bg-slate-300"></Skeleton>
                                    <Skeleton className="h-4 w-[80%] bg-slate-300"></Skeleton>
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-10 bg-slate-300"></Skeleton>
                                    <Skeleton className="h-4 w-[80%] bg-slate-300"></Skeleton>
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-10 bg-slate-300"></Skeleton>
                                    <Skeleton className="h-4 w-[80%] bg-slate-300"></Skeleton>
                                </div>
                            </div> 
                            :
                            <div className="grid grid-cols-3 text-sm mt-2">
                                <div className="flex gap-2">
                                    <p><FontAwesomeIcon icon={faEnvelope} className="w-[100%] md:w-[100%] lg:w-[100%]" /></p>
                                    <p>{profile.email}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p>
                                    <FontAwesomeIcon icon={faLocation} className="w-[100%] md:w-[100%] lg:w-[100%]" /> 
                                    </p>
                                    <p>{profile.location}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p>
                                    <FontAwesomeIcon icon={faPhone} className="w-[100%] md:w-[100%] lg:w-[100%] " />
                                    </p>
                                    <p>{profile.phoneNumber}</p>
                                </div>
                            </div>
                        }
                        
                    </div>
                    {/* <!-- contact --> */}

                    {/* about */}
                    <AboutMe useId={userId} />
                    {/* about */}


                    {/* <!-- grid --> */}
                    <div className="grid grid-cols-6 mt-6 gap-10">
                        <div className="col-span-4">
                            {/* <!-- profile --> */}
                            <ExperienceWidget user_id={userId} />
                            {/* <!-- profile --> */}


                            {/* <!-- Education --> */}
                            <EducationWidget user_id={userId} />
                            {/* <!-- Education --> */}

                            {/* <!-- Projects --> */}
                            <Projects userId={userId} />
                            {/* <!-- Projects --> */}

                            {/* <!-- Projects --> */}
                            <Internship userId={userId} />
                            {/* <!-- Projects --> */}

                            {/* <!-- Links --> */}
                            <Publications userId={userId} />
                            {/* <!-- Links --> */}

                            {/* <!-- Links --> */}
                            <LinksUser userId={userId} />
                            {/* <!-- Links --> */}

                            <References userId={userId} />

                        </div>
                        <div className="col-span-2">
                            {/* <!-- skills --> */}
                            <SkillWidget user_id={userId} />
                            {/* <!-- skills --> */}

                            {/* <!-- languages --> */}
                            <Languages userId={userId} />
                            {/* <!-- languages --> */}

                            {/* <!-- Memberships --> */}
                            <Memberships userId={userId}/>
                            {/* <!-- Memberships --> */}

                            {/* <!-- Hobbies --> */}
                            <Hobbies userId={userId} />
                            {/* <!-- Hobbies --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateFour;