'use client'
import { db, app } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import FileSaver from "file-saver";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";


const PdfGenerationTemplateFour = ({ userId, addressTo, coverLetterContent }) => {


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
            <div style="background-color: #f1f5f9; padding-left: 20px; padding-right: 20px; padding-top: 1.25rem; padding-bottom: 1.25rem;">
                <div class="bg-white p-5">
                    <div class="flex justify-center mb-6">
                        <div></div>
                        <div class="p-5 border-2 border-slate-500 w-[50%] text-center rounded-sm">
                            <p class="text-2xl font-bold">${profile.full_name}</p>
                            <p class="text-sm text-[#808080]">${profile.professionTitle}</p>
                        </div>
                        <div></div>
                    </div>
        
                    <div class="text-sm flex gap-4 justify-center mb-6">
                        <p>${profile.location}</p>
                        <p>${profile.email}</p>
                        <p>${profile.phoneNumber}</p>
                        
                    </div>
        
                    <div class="border-b-2 mb-6"></div>
        
        
                    <div class="grid grid-cols-6">
                        <div class="col-span-2 ">
                            <div class="border-r-2 w-[80%] h-[100%]">
                                <p class="text-sm">To</p>
                                <p>${addressTo}</p>
                            </div>
                        </div>
                        <div class="col-span-4 text-sm">
                            <p class="mb-2 text-[#808080]">03/31/2024</p>
                            <p class="mb-2">Dear ${addressTo},</p>
                            <p class="mb-2">`
                            coverLetterContent
                            .filter((skill) => skill.checked === true)
                            .map((skill) => (
                                template+=`${skill.coverLetter}`
                            ))
                            template+=`</p>
                            <p class="mb-2">Best Regards</p>
                            <p class="mb-2 font-bold">${profile.full_name}</p>
                        </div>
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

export default PdfGenerationTemplateFour;