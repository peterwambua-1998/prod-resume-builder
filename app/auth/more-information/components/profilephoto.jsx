'use client'
import { app } from "@/app/firebase/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

const ProfilePhoto = ({userId}) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            console.log(image);
        }
    };

    async function uploadImage() {
        try {
            const storage = getStorage(app);
            const profileImgRef = ref(storage, `profile-images/${userId}`);

        } catch (error) {
            console.log(error);
        }
    }
    return (  
        <div>
            <div>
                <input type="file" onChange={handleImageChange} />
                <button onClick={uploadImage}>Upload Photo</button>
            </div>
        </div>
    );
}
 
export default ProfilePhoto;