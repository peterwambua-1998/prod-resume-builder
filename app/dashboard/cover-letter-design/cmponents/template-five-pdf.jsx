'use client'
import { db, app } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import FileSaver from "file-saver";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";


const PdfGenerationTemplateFive = ({ userId, addressTo, coverLetterContent }) => {


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
            <div style="background-color: #f1f5f9; padding-left: 20px; padding-right: 20px; padding-top: 1.25rem; padding-bottom: 1.25rem; margin-top: 20px">
                <div class="bg-white p-16">
                    <div class="grid grid-cols-2 mb-8">
                        <div>
                            <p class="text-3xl font-bold">${profile.full_name}</p>
                            <p class="text-sm text-[#808080]">${profile.professionTitle}</p>
                        </div>
                        <div class="text-right text-sm">
                            <p>${profile.location}</p>
                            <p>${profile.email}</p>
                            <p>${profile.phoneNumber}</p>
                        </div>

                    </div>

                    <div class="border-b-4 border-green-500 mb-8"></div>

                    <div>
                        <p class="mb-2 font-semibold">Dear ${addressTo}</p>
                        <p class="mb-2 text-sm">`
                        coverLetterContent
                        .filter((skill) => skill.checked === true)
                        .map((skill) => (
                            template+=`${skill.coverLetter}`
                        ))
                        template+=`</p>
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

export default PdfGenerationTemplateFive;