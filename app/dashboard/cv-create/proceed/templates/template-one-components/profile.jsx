'use client'
import { db } from "@/app/firebase/firebase";
import { faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, onSnapshot, } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Skeleton, Button, Modal, Textarea, Accordion, Badge, Input } from "react-daisyui";



const Profile = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

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
            {
                ((loading == true) && (profile == null)) ?
                    (
                        <div>
                            <Skeleton className="h-4 w-full bg-slate-300"></Skeleton>
                        </div>) :

                    (
                        <div>
                            <p className="font-bold text-base md:text-3xl lg:text-3xl mb-3 text-center">{profile.full_name}</p>
                            <div className="flex justify-center">
                                <div className="dashed-text-container mb-3 w-full md:w-[90%] lg:w-[90%]">
                                    <div className="dashed-line"></div>
                                    <span className="dashed-text font-semibold text-[10px] md:text-lg lg:text-lg ml-3 mr-3">{profile.professionTitle}</span>
                                    <div className="dashed-line"></div>
                                </div>
                            </div>

                                <div className="grid grid-cols-3 md:grid md:grid-cols-3">
                                    <div className="flex flex-col items-center w-full ">
                                        <FontAwesomeIcon icon={faLocationPin} className="text-amber-500 text-xs md:w-[22px]" />
                                        <p className="text-[8px] md:text-sm lg:text-sm">{profile.location}</p>
                                    </div>
                                    <div className="flex flex-col items-center w-full">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-amber-500 text-xs md:w-[22px]" />
                                        <p className="text-[8px] md:text-sm lg:text-sm">{profile.email}</p>
                                    </div>
                                    <div className="flex flex-col items-center w-full">
                                        <FontAwesomeIcon icon={faPhone} className="text-amber-500 text-xs md:w-[22px]" />
                                        <p className="text-[8px] md:text-sm lg:text-sm">{profile.phoneNumber}</p>
                                    </div>
                                </div>
                        </div>

                    )
            }

        </div>
    );
}

export default Profile;