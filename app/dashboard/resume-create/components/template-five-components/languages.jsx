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
        <div>
            {
                languages.length > 0 ? 
                    <div className="md:mt-10 md:pl-2 md:pr-2 lg:mt-10 lg:pl-4 lg:pr-4">
                    <p className="text-center text-[7px] md:text-base font-semibold border-b md:pb-2 lg:pb-2 border-[#808080] md:mb-5 lg:mb-5">Languages</p>
                    {languages.map((lang, index) => (
                        // <li key={index}>{lang.name} (lang.description)</li>
                        <div className="md:pl-2 md:pr-2 lg:pl-8 lg:pr-8 md:mb-5 flex gap-2" key={index}>
                            <p className="font-semibold text-[5px] md:text-xs mb-2">{lang.name}</p>
                            <p className="text-[5px] md:text-xs text-[#808080]">({lang.description})</p>
                        </div>
                    ))}
                </div>: <div></div>
            }
        </div>
    );
}

 
export default Languages;