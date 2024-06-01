import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

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
                    <p className="font-bold text-[8px] md:text-lg lg:text-lg border-b md:border-b-2 lg:border-b-2 border-green-500">Languages</p>
                    : <p></p>
            }

            {
                languages.length > 0 ? (languages.map((language, index) => (
                    <div key={index}>
                        <div className="mt-3">
                            <p className="text-[7px] font-semibold md:text-base lg:text-base pl-5 pr-5">{language.name}</p>
                            <p className="text-[5px] md:text-sm lg:text-sm pl-5 pr-5">{language.description}</p>
                        </div>
                    </div>

                ))) : <div></div>
            }
        </div>
    );
}


export default Languages;