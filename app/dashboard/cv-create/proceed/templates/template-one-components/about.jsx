import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
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
        : (about == null) ? <p className="text-[8px] md:text-sm lg:text-sm ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis excepturi sequi porro blanditiis, labore quo harum ipsam velit eaque maxime? Quas, error. Est ipsam assumenda quia aperiam incidunt itaque fugiat!</p>
        : <p className="text-[8px] md:text-sm lg:text-sm ">{about}</p>
    )
}

export default AboutMe;