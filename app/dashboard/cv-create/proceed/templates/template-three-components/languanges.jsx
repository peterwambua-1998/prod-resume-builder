import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Badge, Divider } from "react-daisyui";

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
            <div>
                <p className="mb-2 font-bold">Languages</p>
                <div className="flex gap-4 flex-wrap">
                    {languages.map((language, index) => (
                        <Badge className="p-4 bg-amber-600 text-black" key={index}>{language.name}</Badge>
                    ))}
                </div>
                <Divider></Divider>
            </div>
            : <div></div>
        }
        
    </div>
    )
}

 
export default Languages;