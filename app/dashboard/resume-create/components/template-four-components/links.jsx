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
                <div>
                <div className="md:grid md:grid-cols-5 mt-10">
                    <div className="col-span-1 pl-2 mb-5">
                    </div>
                    <div className="col-span-4 pl-10 mb-5">
                        <p className="font-bold text-lg  border-b">Links</p>
                    </div>
                </div>
                    
                { (links.map((link, index) => (
                    <div className="md:grid md:grid-cols-5 mt-2" key={index}>
                        <div className="col-span-1 pl-2 text-right mb-6">
                            <p>{link.name}</p>
                        </div>
                        <div className="col-span-4 pl-10 mb-6">
                            <p className="text-sm text-[#808080]">{link.link}</p>
                        </div>
                    </div>
                )))}</div> : <div></div>
            }

        </div> 
    );
}

export default LinksUser;