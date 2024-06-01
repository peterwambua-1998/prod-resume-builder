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
        (profile == null && loading) ? <Skeleton className="h-24 mb-2 w-24 bg-slate-400 rounded-full"></Skeleton>
        : (fileUrl) ? <Image alt="profile" id="temp-two-profile" src={fileUrl} width={120} height={120} className={'rounded-full w-[40px] h-[40px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]'} />
        : <Image alt="profile" src={dummyPhoto} width={120} height={120} className={'rounded-full w-[40px] h-[40px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]'} />
    );
}
 
export default ProfilePhoto;