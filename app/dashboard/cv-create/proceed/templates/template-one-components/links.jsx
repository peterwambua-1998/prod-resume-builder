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
                links.length > 0 ? <p className="font-bold text-[12px] md:text-lg lg:text-lg text-center mt-2 border-b">Links</p> : <div></div>
            }
            {
                links.length > 0 ?
                links.map((link, index) => (
                    <div className="mt-5" key={index}>
                        <p className="text-blue-600 font-bold mb-2 text-[8px] md:text-lg lg:text-lg">{link.name}</p>
                        <div className="pl-3">
                            <ul style={{ listStyleType: 'disc' }}>
                                <li className="text-[5%] md:text-sm lg:text-sm">{link.link}</li>
                            </ul>
                        </div>
                    </div>
                )): <div></div>
            }
        </div>
        
    );
}

export default LinksUser;