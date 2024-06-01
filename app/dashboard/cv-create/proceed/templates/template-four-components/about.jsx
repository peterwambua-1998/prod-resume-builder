import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Divider, Skeleton } from "react-daisyui";

const AboutMe = ({ useId }) => {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getAbout() {
        try {
            onSnapshot(doc(db, 'about', useId), doc => {
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
            <div>
                <p className="mb-2 mt-2 font-bold text-[#808080]">About</p>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quis nihil ipsum laborum blanditiis, tenetur delectus aut aspernatur asperiores eaque ipsam, tempore saepe maxime! Sapiente dolor autem sunt laboriosam totam.</p>
                <Divider></Divider>
            </div>
        : 
            <div>
                <p className="mb-2 mt-2 font-bold text-[#808080]">About</p>
                <p className="text-sm">{about}</p>
                <Divider></Divider>
            </div>
    )
}

export default AboutMe;