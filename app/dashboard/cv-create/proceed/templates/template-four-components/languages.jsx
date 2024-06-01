import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Badge } from "react-daisyui";

const Languages = ({ userId }) => {
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
                    <div className="mb-10">
                        <p className="text-violet-900 font-bold">Languages</p>
                        <div className="flex gap-2 flex-wrap text-sm">
                        {languages.map((lang, index) => (
                            <span className="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold" key={index}>{lang.name} ({lang.description})</span>
                        ))}
                        </div>
                    </div>
                : <span></span>
            }

        </div>

    );
}


export default Languages;