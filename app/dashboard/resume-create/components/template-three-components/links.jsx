import { db } from "@/app/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Divider } from "react-daisyui";


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
             <div>
                <p className="mb-2 font-bold mt-8">Links</p>
                {links.map((link, index) => (
                
                    <div className="text-sm">
                        <p><span className="font-bold pr-2">{link.name}:</span><span className="text-amber-600">{link.link}</span></p>
                        
                    </div>
                ))}
                <Divider></Divider>
                </div>

            : <div></div>

            }
        
    </div>
    );
}

export default LinksUser;