'use client'
import { useEffect, useState } from "react";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";
import { Skeleton } from "react-daisyui";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import PdfGenerationTemplateFour from "./template-four-pdf";

const TemplateFour = ({ coverLetter, userId, coverLetterId }) => {

    const [profile, setProfile] = useState(null);
    const [addressTo, setAddressedTo] = useState(null);

    async function getProfile() {
        let profData = await profileGlobal(userId);
        setProfile(profData);
    }

    async function getAddressedTo() {
        onSnapshot(doc(db, "cover-letter", coverLetterId), (doc) => {
            setAddressedTo(doc.data()['to']);
        });
    }

    useEffect(() => {
        getProfile();
        getAddressedTo();
    }, []);


    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
                <PdfGenerationTemplateFour userId={userId} addressTo={addressTo} coverLetterContent={coverLetter} />
            </div>
            <div className="pt-5 pb-5 px-2 md:px-[4%] lg:px-[20%]">
                <div className="bg-white p-5">
                    {/* top area */}
                    <div className="flex justify-center mb-6">
                        <div></div>
                        <div className="p-5 border-2 border-slate-500 w-[50%] text-center rounded-sm">

                            {
                                profile == null ? <Skeleton></Skeleton> : <p className="text-base md:text-2xl lg:text-2xl font-bold">{profile.full_name}</p>
                            }
                            {
                                profile == null ? <Skeleton></Skeleton> : <p className="text-xs md:text-sm lg:text-sm text-[#808080]">{profile.professionTitle}</p>
                            }
                        </div>
                        <div></div>
                    </div>


                    {
                        profile == null ? <div className="text-[10px] md:text-sm lg:text-sm flex gap-4 justify-center mb-6"><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton></div> : 
                        <div className="text-[10px] md:text-sm lg:text-sm flex gap-4 justify-center mb-6">
                            <p>{profile.location}</p>
                            <p>{profile.email}</p>
                            <p>{profile.phoneNumber}</p>
                        </div>
                    }

                    <div className="border-b-2 mb-6"></div>

                    {/* top area */}

                    {/* grid area */}
                    <div className="grid grid-cols-6">
                        <div className="col-span-2 ">
                            <div className="border-r-2 w-[80%] h-[100%] text-xs md:text-sm lg:text-sm">
                                <p className="">To</p>
                                <p>{
                                    addressTo == null ? 'Not Provided' : `${addressTo}`
                                }</p>
                            </div>
                        </div>
                        <div className="col-span-4 text-xs md:text-sm lg:text-sm">
                            <p className="mb-2 text-[#808080]">03/31/2024</p>
                            <p className="mb-2">Dear {
                                addressTo == null ? 'Not Provided' : `${addressTo}`
                            },</p>
                            {
                                coverLetter
                                    .filter((skill) => skill.checked === true)
                                    .map((skill) => (
                                        <p key={skill.id} className="mb-2">{skill.coverLetter}</p>
                                    ))
                            }
                            <p className="mb-2">Best Regards</p>
                            {
                                profile == null ? <Skeleton></Skeleton> : <p className="mb-2 font-bold">{profile.full_name}</p>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TemplateFour;