'use client'
import { faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {  Skeleton } from "react-daisyui";
import { useEffect, useRef, useState } from "react";
import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot, } from "firebase/firestore";
import AboutMe from "./template-two-components/about";
import SkillWidget from "./template-two-components/skills";
import Award from "./template-two-components/achievements";
import EducationWidget from "./template-two-components/education";
import ExperienceWidget from "./template-two-components/experience";
import References from "./template-two-components/references";
import Internship from "./template-two-components/internship";
import Memberships from "./template-two-components/membership";
import Publications from "./template-two-components/publications";
import LinksUser from "./template-two-components/links";
import Languages from "./template-two-components/languanges";
import GeneratePDF from "./template-two-components/generate-pdf";
import ProfilePhoto from "../../cv-create/proceed/templates/template-two-components/profilePhoto";

const TempTwo = ({ userId, about, skills }) => {
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
    }, []);

    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
                <GeneratePDF userId={userId} skillsAi={skills} aboutAI={about} />
            </div>
            <div className=" bg-white grid grid-cols-6 md:grid md:grid-cols-6">
                <div className="col-span-2 bg-stone-700 pt-2 pl-2 pr-2 md:pt-5 md:pl-10 md:pr-10 text-white">
                    <div className="flex justify-center">
                        {
                            profile == null ?
                                <Skeleton className="h-[40px] w-[40px] bg-slate-400 rounded-full"></Skeleton>
                                :
                                <ProfilePhoto userId={userId} smWidth={40} mdWidth={200} lgWidth={200} />
                                // <Image alt="profile-photo" src={profile.file_url} width={120} height={120} className="rounded-full w-[40px] h-[40px] md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[120px]" />
                        }
                    </div>
                    {/* location email */}
                    <div className="flex flex-col mt-5">
                        {
                            profile == null
                                ?
                                (
                                    <div>
                                        <Skeleton className="h-4 w-full bg-slate-400"></Skeleton>
                                    </div>) :

                                (
                                    <div>
                                        <table className="mb-2">
                                            <tbody>
                                                <tr>
                                                    <td><FontAwesomeIcon icon={faPhone} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                                    <td><p className="text-[5%] md:text-base lg:text-base">{profile.phoneNumber}</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="mb-2">
                                            <tbody>
                                                <tr>
                                                    <td><FontAwesomeIcon icon={faLocationPin} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                                    <td><p className="text-[5%] md:text-base lg:text-base">{profile.location}</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="mb-2">
                                            <tbody>
                                                <tr>
                                                    <td><FontAwesomeIcon width={22} icon={faEnvelope} className="text-green-500 w-[5px] md:w-[22px]" /></td>
                                                    <td><p className="text-[5%] md:text-base lg:text-base">{profile.email}</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                        }
                    </div>
                    {/* location email */}
                    <div className="md:mt-5 lg:mt-5">

                    </div>
                    <div className="mt-5">
                        <SkillWidget skills={skills} />
                    </div>
                    <div className="mt-5">
                        <Award userId={userId} />
                    </div>
                    <div className="mt-5">
                        <Memberships userId={userId} />
                    </div>
                    <div className="mt-5">
                        <Languages userId={userId} />
                    </div>
                </div>
                <div className="col-span-4 bg-white p-2 md:p-[5%] lg:p-[5%]">
                    {
                        profile != null ?
                            <p className="md:text-3xl lg:text-3xl font-semibold pb-5 text-green-700">{profile.full_name}</p>
                            :
                            <Skeleton className="h-4 w-[60%] bg-slate-400"></Skeleton>
                    }

                    <AboutMe about={about} />

                    <EducationWidget user_id={userId} />

                    <ExperienceWidget user_id={userId} />

                    <Internship userId={userId} />

                    

                    <Publications userId={userId} />

                    <LinksUser userId={userId} />

                    <References userId={userId} />
                </div>
            </div>
        </div>
    );
}

export default TempTwo;


