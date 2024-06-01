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
                <div className="p-2 md:p-5 lg:p-5" >
                    <p className="font-bold text-[8px] md:text-xl lg:text-xl mb-3">Links</p>
                    {links.map((link, index) => (
                
                    <div className="flex  text-black"  key={index}>
                        <div className="mb-8 ">
                            <p className="text-green-600 font-bold mb-2 text-[6px] md:text-base lg:text-base">{link.name}</p>
                            <div className="text-[5px] md:text-sm lg:text-sm">
                                <p>{link.link}</p>
                            </div>
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