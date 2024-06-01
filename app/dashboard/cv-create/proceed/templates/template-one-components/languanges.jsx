import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Languages = ({userId}) => {
    const [languages, setLanguages] = useState([]);

    function getLanguages() {
        try {
            let langsRef = collection(db, 'languages');
            let q = query(langsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setLanguages([]);
                docs.forEach(doc => {
                    setLanguages(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLanguages();
    }, []);

    return (
        <div className="mb-5">
            {
                languages.length > 0 ?
                    <div>
                        <div className="bg-indigo-950 ">
                            <p className="font-bold text-[8px] md:text-lg lg:text-lg text-center">Languages</p>
                        </div>
                        <div className="flex justify-center text-black pt-2">
                            <ul style={{ listStyleType: 'disc' }} className="text-black pl-10 pr-10 ">
                                {languages.map((lang, index) => (
                                    <li key={index}>{lang.name} ({lang.description})</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    : <div></div>
            }

        </div>
    );

    if (hobbies.length < 1) {
        return (
            <div className="text-[#808080] pl-5 pr-5 pt-5">You currently have no hobbies saved</div>
        )
    } else {
        return (
            <div>
                <div className="flex justify-center text-black">
                    <ul style={{ listStyleType: 'disc' }} className="text-black pl-10 pr-10 ">
                        {languages.map((lang, index) => (
                            <li key={index}>{lang.name} ({lang.description})</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

 
export default Languages;