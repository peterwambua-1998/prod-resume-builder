'use client'
import { db, app } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import FileSaver from "file-saver";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";


const PdfGenerationTemplateTwo = ({ userId, addressTo, coverLetterContent }) => {


    const [mDownload, setMDownload] = useState(false);
    const [profile, setProfile] = useState(null);
    
    async function getData() {
        let profData = await profileGlobal(userId);
        setProfile(profData);
    }

    useEffect(() => {
        getData();
    }, []);

    async function downloadPDF() {
        // check if user has subscription
        setMDownload(true);
        let subDoc = await getDoc(doc(db, 'subscriptions', userId));
        // take user to subscription page to begin payment
        if (subDoc.exists() == false) {
            return router.replace('/dashboard/subscription');
        }
    
        let template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <script src="https://cdn.tailwindcss.com"></script>
        
        </head>
        <body>
            <div style="background-color: #f1f5f9; padding-left: 1rem; padding-right: 1rem; padding-top: 1.25rem; padding-bottom: 1.25rem; width: 100%; margin-top: 20px;">
                <div class="bg-white text-black rounded pt-5 pr-20 pb-5 text-sm grid grid-cols-6">
        
                    <div class="col-span-2 text-right w-[90%] pl-5 pt-2 pr-5 border-r border-slate-400">
                        <div class="text-2xl font-bold">
                            <p>${profile.full_name}</p>
                        </div>
        
                        <p class="text-sm mt-4">${profile.professionTitle}</p>
        
                        <div class="mt-[20vh]">
                            <p class="font-bold">To</p>
                            <p>Mr ${addressTo}</p>
                        </div>
        
                        <div class="mt-[20vh]">
                            <p class="font-bold">From</p>
                            <p>${profile.full_name}</p>
                            <p>${profile.professionTitle}</p>
                            <p>${profile.location}</p>
                            <p>${profile.email}</p>
                            <p>${profile.phoneNumber}</p>
                        </div>
                    </div>
                   
                    <div class="col-span-4 pt-10">
                        <p class="mb-2">4/1/2024</p>
        
                        <p class="mb-2 font-bold">Dear ${addressTo}</p>
        
                        <p class="mb-2">`
                        coverLetterContent
                        .filter((skill) => skill.checked === true)
                        .map((skill) => (
                            template+=`${skill.coverLetter}`
                        ))
                        template+=`
                        </p>
                    </div>
        
                </div>
            </div>
        </body>
        </html>
        `;

        const options = {
            method: 'POST',
            body: JSON.stringify({
                "template": template,
            }),
        };

        let aboutAI = await fetch('/api/puppeteer', options);
        let blob = await aboutAI.blob();
        FileSaver.saveAs(blob, "cover-letter.pdf");
        setMDownload(false);
    }

    return (
        <Button onClick={() => downloadPDF()} color="primary">
            {mDownload == true ? <Loading /> : ''}
            Download PDF
        </Button>
    );
}

export default PdfGenerationTemplateTwo;