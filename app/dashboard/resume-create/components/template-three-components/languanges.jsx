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
            languages.map((language, index) => (
                <div className="p-2 md:p-5 lg:p-5" key={index}>
                    <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Links</p>
                    <div className="flex  text-black">
                        <div className="mb-8 ">
                            <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">{link.name}</p>
                            <div className="text-[5px] md:text-sm lg:text-sm">
                                <p>{link.link}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            : <div></div>
        }
        
    </div>
    )
}

 
export default Languages;