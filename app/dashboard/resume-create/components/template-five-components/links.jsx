import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";


const LinksUser = ({ userId }) => {
    const [links, setLinks] = useState([]);

    function getLinks() {
        try {
            let linksRef = collection(db, 'links');
            let q = query(linksRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setLinks([]);
                docs.forEach(doc => {
                    let docId = doc.id;
                    const documentData = doc.data();
                    const newData = { ...documentData, id: docId };
                    setLinks(prev => [...prev, newData]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }
   

    useEffect(() => {
        getLinks();
    }, []);


    return (
        <div>
            {
                links.length > 0 ? 
                <div className="mt-8">
                    <p className="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">Links</p>
                    {links.map((link, index) => (
                        <div className="pr-2 pl-2 md:pl-4 md:pr-4" key={index}>
                            <div className="mb-3 md:mb-6 lg:mb-6">
                                <p className="text-[8px] md:text-xs lg:text-sm mb-2 font-semibold mt-2 md:mt-5 lg:mt-5">{link.name}</p>
                                <p className="text-[6px] md:text-[10px] lg:text-xs">
                                {link.link}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
                : <div></div>
            }
        </div>
    );
}

export default LinksUser;