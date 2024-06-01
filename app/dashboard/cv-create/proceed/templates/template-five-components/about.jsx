import { db } from "@/app/firebase/firebase";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "react-daisyui";

const AboutMe = ({ useId }) => {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getAbout() {
        try {
            const usb = onSnapshot(doc(db, 'about', useId), doc => {
                if (doc.data()) {
                    setAbout(doc.data()['description']);
                } else {
                    setAbout(null);
                }
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAbout();
    }, []);


    return (
        (about == null && loading) ? 
            <div>
                <Skeleton className="h-6 mb-2 w-[20%] bg-slate-400"></Skeleton>
                <Skeleton className="h-16 w-full bg-slate-400"></Skeleton>
            </div>
        : (about == null) ? 
            <div className="mt-2 md:mt-4 lg:mt-8">
                <p className="text-[5px] md:text-[10px] lg:text-xs text-[#808080]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore dignissimos reprehenderit laboriosam! Voluptas exercitationem eligendi deserunt, consequatur facere ab voluptates enim, culpa aperiam velit similique assumenda, repellat vero aliquid ex.</p>
            </div>
        : 
            <div className="mt-2 md:mt-4 lg:mt-8">
                <p className="text-[5px] md:text-[10px] lg:text-xs text-[#808080]">{about}</p>
            </div>
    )


}

export default AboutMe;