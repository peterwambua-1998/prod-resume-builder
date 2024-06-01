'use client'

import { useRef, useState } from "react";
import AboutMe from "./template-one-components/about";
import { db } from "@/app/firebase/firebase";
import ExperienceWidget from "./template-one-components/experience";
import EducationWidget from "./template-one-components/education";
import References from "./template-one-components/references";
import Award from "./template-one-components/achievements";
import SkillWidget from "./template-one-components/skills";
import Profile from "./template-one-components/profile";
import Hobbies from "./template-one-components/hobbies";
import Projects from "./template-one-components/projects";
import ProfilePhoto from "../../cv-create/proceed/templates/template-one-components/profilePhoto";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Internship from "./template-one-components/internship";
import Memberships from "./template-one-components/membership";
import Publications from "./template-one-components/publications";
import LinksUser from "./template-one-components/links";
import PdfGenerationTemplateOne from "./template-one-components/generate-pdf";
// import { html2pdf } from "html2pdf.js";



const TempOne = ({ userId, about, skills }) => {
    const router = useRouter();

    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
                <PdfGenerationTemplateOne userId={userId} skillsAi={skills} aboutAIs={about} />
            </div>
            <div id="template-one"  className=" bg-white ">
                {/* top dark area */}
                <div className=" bg-indigo-950 text-white p-2 md:p-10 lg:p-10">
                    <Profile userId={userId} smWidth={40} mdWidth={60} lgWidth={60} />
                </div>
                {/* top dark area */}

                {/* profile photo and about */}
                <div className="grid grid-cols-4 md:grid md:grid-cols-4 mt-5">
                    <div className="pl-5 pr-0 md:pl-20 md:pr-0 lg:pl-10 lg:pr-0">
                        <ProfilePhoto userId={userId} smWidth={40} mdWidth={180} lgWidth={'190px'} />
                    </div>
                    <div className="col-span-3 md:pr-10 lg:pr-10">
                        <p className="mb-2 font-bold text-indigo-950 text-xs md:text-lg lg:text-lg">Profile </p>
                        <AboutMe about={about} />
                    </div>
                </div>
                {/* profile photo and about */}

                {/* grid */}
                <div className="grid grid-cols-4 md:grid md:grid-cols-4 mt-5">
                    <div className=" text-white border-r border-amber-400">
                        <div className="bg-indigo-950">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Skills</p>
                        </div>
                        <SkillWidget skills={skills} />

                        <Hobbies userId={userId} />

                        <Memberships userId={userId} />

                        <Award userId={userId} />
                    </div>
                    <div className="col-span-3 pl-5 pr-5 md:pl-10 md:pr-10 lg:pl-10 lg:pr-10 border-t border-amber-400">
                        <ExperienceWidget user_id={userId} />

                        <EducationWidget user_id={userId} />

                        <Projects userId={userId} />

                        <Internship userId={userId} />

                        <Publications userId={userId} />

                        <LinksUser userId={userId} />

                        <References userId={userId} />
                    </div>
                </div>
                {/* grid */}
            </div>
        </div>
    );
}

export default TempOne;