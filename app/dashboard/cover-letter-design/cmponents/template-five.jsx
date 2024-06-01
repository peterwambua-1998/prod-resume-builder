'use client'
import { useEffect, useState } from "react";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";
import { Skeleton } from "react-daisyui";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import PdfGenerationTemplateFive from "./template-five-pdf";

const TemplateFive = ({ coverLetter, userId, coverLetterId }) => {

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
                <PdfGenerationTemplateFive userId={userId} addressTo={addressTo} coverLetterContent={coverLetter} />
            </div>
            <div className="pt-5 pb-5 px-2 md:px-[4%] lg:px-[20%]">
                <div className="bg-white p-8 md:p-16 lg:p-16">
                    {/* top area */}
                    <div className="grid grid-cols-2 mb-8">
                        <div>
                            {
                                profile == null ? <Skeleton></Skeleton> : <p className="text-base md:text-xl lg:text-3xl font-bold">{profile.full_name}</p>
                            }
                            {
                                profile == null ? <Skeleton></Skeleton> : <p className="text-xs md:text-sm lg:text-sm text-[#808080]">{profile.professionTitle}</p>
                            }

                        </div>

                        {
                            profile == null ? <div className="text-right text-sm"><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton></div> :
                            <div className="text-right text-xs md:text-sm lg:text-sm">
                                <p>{profile.location}</p>
                                <p>{profile.email}</p>
                                <p>{profile.phoneNumber}</p>
                            </div>
                        }
                    </div>
                    {/* top area */}

                    <div className="border-b-4 border-green-500 mb-8"></div>

                    <div className="text-sm md:text-base lg:text-base">
                        <p className="mb-2 font-semibold">Dear {
                            addressTo == null ? 'Not Provided' : `${addressTo}`
                        },</p>

                        {
                            coverLetter
                                .filter((skill) => skill.checked === true)
                                .map((skill) => (
                                    <p key={skill.id} className="mb-2 text-sm">{skill.coverLetter}</p>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateFive;