'use client'
import { useEffect, useState } from "react";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";
import { Skeleton } from "react-daisyui";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import PdfGenerationTemplateThree from "./template-three-pdf";

const TemplateThree = ({ coverLetter, userId, coverLetterId }) => {

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
                <PdfGenerationTemplateThree userId={userId} addressTo={addressTo} coverLetterContent={coverLetter} />
            </div>
            <div className="pt-5 pb-5 px-2 md:px-[4%] lg:px-[20%]">
                <div className="my-gradient text-black rounded pl-4 pr-4 md:px-10 lg:px-20 pt-5 pb-5 text-sm ">
                    <div className="flex justify-between border-b-2 border-black pb-5">
                        <div>
                            {
                                profile == null ? <Skeleton></Skeleton> : <p className="font-bold text-lg">{profile.full_name}</p>
                            }
                            {
                                profile == null ? <Skeleton></Skeleton> : <p>{profile.professionTitle}</p>
                            }
                        </div>
                        <div className="text-right">
                            {
                                profile == null ? <div><Skeleton></Skeleton><Skeleton></Skeleton></div> : <div>
                                    <p className="font-bold">{profile.email}</p>
                                    <p>{profile.phoneNumber}</p>
                                </div>
                            }

                        </div>
                    </div>
                    <div className="text-xs pt-5">
                        {
                            profile == null ? <div><Skeleton></Skeleton></div> : <div>
                                <p>{profile.location}</p>
                            </div>
                        }

                    </div>

                    <div className="text-sm mt-20">
                        <p className="font-semibold">To {
                            addressTo == null ? 'Not Provided,' : `${addressTo},`
                        }</p>
                        <p className="text-lg mt-5 mb-5">06/12/2022</p>
                        <p className="mb-2">Dear {
                            addressTo == null ? 'Not Provided,' : `${addressTo},`
                        }</p>
                        {
                            coverLetter
                                .filter((skill) => skill.checked === true)
                                .map((skill) => (
                                    <p key={skill.id}>{skill.coverLetter}</p>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateThree;