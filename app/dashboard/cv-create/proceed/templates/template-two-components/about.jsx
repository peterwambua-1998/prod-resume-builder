import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Skeleton } from "react-daisyui";

const AboutMe = ({ useId }) => {
    var [about, setAbout] = useState(null);
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
        <div className="p-2 md:p-5 lg:p-5">
            <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">About</p>
            <p className="mt-3 text-[5px] md:text-sm lg:text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, natus vitae? Impedit, iusto similique eligendi accusamus debitis minima maiores vel sequi ad enim fuga alias quo eum distinctio, expedita consequatur.</p>
        </div>
        : 
        <div className="p-2 md:p-5 lg:p-5">
            <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">About</p>
            <p className="mt-3 text-[5px] md:text-sm lg:text-sm">{about}</p>
        </div>
    )
}

export default AboutMe;