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
            <div className="mb-10">
                <p className="text-violet-900 font-bold">Links</p>
                 {links.map((link, index) => (
                        <div className="mt-2 mb-2" key={index}>
                            <p className="text-base font-semibold">{link.name}</p>
                            <p className="text-sm text-[#475569]"> {link.link}</p>
                        </div>
                    ))} 
            </div>
            : 
            <div></div>
            }
        </div>
    );
}

export default LinksUser;