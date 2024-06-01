'use client'
import { useEffect, useState } from "react";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";
import { Skeleton } from "react-daisyui";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import PdfGenerationTemplateOne from "./template-one-pdf";

const TemplateOne = ({ coverLetter, userId, coverLetterId }) => {
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
    }, [])

    return (
        <div>
            <div className="flex flex-row-reverse mb-4">
                <PdfGenerationTemplateOne userId={userId} addressTo={addressTo} coverLetterContent={coverLetter} />
            </div>
            <div className="cover-letter-padding">
                <div className="bg-slate-900 text-white rounded pl-20 pt-5 pr-20 pb-5 text-sm">
                    <div className="flex justify-between  ">
                        <div>
                            {
                                profile == null ? <Skeleton></Skeleton> : <p>{profile.professionTitle}</p>
                            }
                        </div>
                        <div className="text-right">
                            {
                                profile == null ? <div><Skeleton></Skeleton><Skeleton></Skeleton><Skeleton></Skeleton></div> : <div>
                                    <p>{profile.location}</p>
                                    <p>{profile.email}</p>
                                    <p>{profile.phoneNumber}</p>
                                </div>
                            }

                        </div>
                    </div>
                    {/* name */}
                    <div className="my-font-two mt-28 text-5xl font-bold">
                        {
                            profile == null ? <Skeleton></Skeleton> : <p>{profile.full_name}</p>
                        }
                    </div>
                    {/* name */}

                    {/* to and cover letter content */}
                    <div className="grid grid-cols-4 mt-12">
                        <div className="col-span-1">
                            <p className="text-xs">to</p>
                            {
                                addressTo == null ? <p>Not Provided</p> : <p>{addressTo}</p>
                            }
                        </div>
                        <div className="col-span-3">
                            <p>06/12/2022</p>
                            <p className="mt-5">Dear {
                                addressTo == null ? 'Not Provided' : `${addressTo}`
                            },</p>
                            <p>
                                {
                                    coverLetter
                                        .filter((skill) => skill.checked === true)
                                        .map((skill) => (
                                            <div className="show-selected-skills" key={skill.id}>
                                                <p className="">{skill.coverLetter}</p>
                                            </div>
                                        ))
                                }
                            </p>
                        </div>
                    </div>
                    {/* to and cover letter content */}

                </div>

            </div>
        </div>
    );
}

export default TemplateOne;