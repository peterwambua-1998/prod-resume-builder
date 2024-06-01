'use client'
import { auth, db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Divider, Loading, Button, Badge } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import TemplateOne from "./templates/template-one";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TemplateTwo from "./templates/template-two";
import AboutAddEdit from "./templates/add-edit/about";
import SkillAddEdit from "./templates/add-edit/skills";
import AwardAddEdit from "./templates/add-edit/awards";
import ProfileDetails from "./templates/add-edit/profile";
import ReferencesEditDelete from "./templates/add-edit/references";
import ExperienceAddEdit from "./templates/add-edit/experience";
import EducationAddEdit from "./templates/add-edit/education";
import HobbiesAddEdit from "./templates/add-edit/hobbies";
import ProjectsAddEdit from "./templates/add-edit/projects";
import TemplateThree from "./templates/template-three";
import Languages from "./templates/add-edit/languages";
import LinksUser from "./templates/add-edit/links";
import TemplateFour from "./templates/template-four";
import ResumeParser from "../../resume-parser";
import TemplateFive from "./templates/template-five";
import Internship from "./templates/add-edit/internships-volunteer-work";
import Memberships from "./templates/add-edit/membership";
import Publications from "./templates/add-edit/publications";


const CvPageDesign = () => {

    const [firebase_user, loading, error] = useAuthState(auth);


    return (
        <div className="md:grid md:grid-cols-4 bg-slate-200">
            <div className="bg-white h-[30vh] overflow-y-auto md:h-[100%] pt-10 pl-5 pr-5">
                <ProfileDetails userId={firebase_user.uid} />
                <AboutAddEdit useId={firebase_user.uid} />
                <ExperienceAddEdit user_id={firebase_user.uid} />
                <EducationAddEdit userId={firebase_user.uid} />
                <SkillAddEdit user_id={firebase_user.uid} />
                <AwardAddEdit userId={firebase_user.uid} />
                <ReferencesEditDelete userId={firebase_user.uid} />
                <HobbiesAddEdit userId={firebase_user.uid} />
                <Languages userId={firebase_user.uid} />
                <LinksUser userId={firebase_user.uid} />
                <ProjectsAddEdit userId={firebase_user.uid} />
                <Internship userId={firebase_user.uid} />
                <Memberships userId={firebase_user.uid} />
                <Publications userId={firebase_user.uid} />
            </div>
            <div className="md:col-span-3 p-10">
                {/* tabs */}
                <Tabs>
                    <TabList className='flex gap-4 bg-blue-950 p-3 rounded-lg mb-5 text-sm overflow-x-auto'>
                        <Tab selectedClassName="active-tab" className='m-tabs text-xs md:text-sm pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template One</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs text-xs md:text-sm pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Two</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs text-xs md:text-sm pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Three</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs text-xs md:text-sm pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Four</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs text-xs md:text-sm pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Five</Tab>
                    </TabList>
                    <TabPanel>
                        <TemplateOne userId={firebase_user.uid} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateTwo userId={firebase_user.uid} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateThree userId={firebase_user.uid} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateFour userId={firebase_user.uid} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateFive userId={firebase_user.uid} />
                    </TabPanel>
                </Tabs>

            </div>

        </div>
    )
}

export default CvPageDesign;

{/* {ab != null ? (<div>{ab.description}</div>) : (<p>lb</p>)} */ }