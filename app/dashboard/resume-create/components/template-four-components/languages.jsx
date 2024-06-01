import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Badge } from "react-daisyui";

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

                <div className="md:grid md:grid-cols-5 mt-5">
                <div className="col-span-1 pl-2 mb-5">
                </div>
                <div className="col-span-4 pl-10 mb-5">
                    <p className="font-bold text-lg  border-b">Languages</p>
                </div>

                <div className="col-span-1 pl-2 text-right">
                    <p></p>
                    <p className="text-xs text-[#808080]"></p>
                </div>
                <div className="col-span-4 pl-10 mb-6">
                    <div className="md:flex flex-wrap  md:gap-4">
                    {languages.length > 0 ? (languages.map((lang, index) => (
                        <div key={index}>
                            <div><Badge className="p-4 bg-cyan-400 text-black">{lang.name} - ({lang.description})</Badge></div>
                        </div>
                        ))): (<div className="text-[#808080] text-sm p-2 md:p-5 lg:p-5">You currently have no languages data</div>)
                    }
                    </div>
                </div>
            </div>
            </div>

        );
}

 
export default Languages;