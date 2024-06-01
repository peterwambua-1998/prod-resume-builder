import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Skeleton } from "react-daisyui";
import Image from "next/image";
import dummyPhoto from '@/app/images/profile-user.png';

const ProfilePhoto = ({userId}) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fileUrl, setFileUrl] = useState(false);

    function getProfile() {
        try {
            onSnapshot(doc(db, 'profile', userId), doc => {
                if (doc.data()) {
                    setProfile(doc.data());
                    setFileUrl(doc.data()['file_url']);
                } else {
                    setProfile(null);
                }
            });
            setLoading(false);

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
                (profile == null && loading) ? <Skeleton className="h-6 mb-2 w-[20%] bg-slate-400"></Skeleton>
                : (fileUrl) ? <Image alt="profile" id="profile-temp-three" src={fileUrl} width={120} height={120} className={'rounded-full w-[20px] h-[20px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px]'} />
                : <Image alt="profile" src={dummyPhoto} width={120} height={120} className={'rounded-full w-[20px] h-[20px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px]'} />
            }
        </div>
    )
}
 
export default ProfilePhoto;