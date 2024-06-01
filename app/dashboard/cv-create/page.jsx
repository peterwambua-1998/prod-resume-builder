'use client'
import { Input, Textarea, Accordion, Badge, Button } from "react-daisyui";
import Hobbies from "./components/hobbies";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";
import AboutMe from "./components/about-me";
import WebsiteLink from "./components/website";
import References from "./components/references";
import Address from "./components/address";
import Award from "./components/award";
import Projects from "./components/projects";
import ExperienceWidget from "./components/experince";
import EducationWidget from "./components/education";
import SkillWidget from "./components/skills";
import Link from "next/link";

const CreateCv = () => {
    const [firebase_user, loading, error] = useAuthState(auth);

    if (loading) {
        return (<div>loading...</div>)
    }

    if (!loading && firebase_user != null) {
        return (
            <div className="p-0 h-[100vh] resume-bg bg-slate-200">
                <div className="p-5">
                    <Link href='/dashboard/cv-create/proceed' className="w-[100%] bg-[#1E3A8A] text-white pl-5 pr-5 pt-3 pb-3 rounded-md">View CV</Link>
                </div>
                <div className="md:grid grid-cols-2 gap-12">
                    <div className="p-5">
                        <Hobbies userId={firebase_user.uid} />
                        <br />
                        <AboutMe userId={firebase_user.uid} />
                        <br />
                        <WebsiteLink userId={firebase_user.uid} />
                        <br />
                        <Projects userId={firebase_user.uid} />
                        <br />
                        <EducationWidget user_id={firebase_user.uid} />
                    </div>
                    <div className="p-5">
                        <ExperienceWidget user_id={firebase_user.uid} />
                        <br />
                        <References userId={firebase_user.uid} />
                        <br />
                        <Address userId={firebase_user.uid} />
                        <br />
                        <Award userId={firebase_user.uid} />
                        <br />
                        <SkillWidget user_id={firebase_user.uid} />
                    </div>
                </div>

            </div>
        );
    }


}

export default CreateCv;

/* <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                        <div className="flex w-full items-center justify-start gap-2 mb-3">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-black">Hobbies</span>
                                </label>
                                <Input className="bg-white text-black" placeholder="Ex: google" onChange={(e) => setCompanyName(e.target.value)} />
                                 <div className="text-red-600 text-sm">{companyNameError}</div> 
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-start gap-2 mb-3">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-black">Location</span>
                                </label>
                                <Input className="bg-white text-black" placeholder="Ex: united states" onChange={(e) => setLocation(e.target.value)} />
                                 <div className="text-red-600 text-sm">{locationError}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full items-center justify-end gap-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Describe what you did</span>
                            </label>
                            <Textarea className="bg-white text-black" onChange={(e) => setUDescription(e.target.value)} />
                             <div className="text-red-600 text-sm">{uDescriptionError}</div>
                        </div>
                    </div> */