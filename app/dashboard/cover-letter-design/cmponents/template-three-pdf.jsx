'use client'
import { db, app } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import FileSaver from "file-saver";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";


const PdfGenerationTemplateThree = ({ userId, addressTo, coverLetterContent }) => {


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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <div class="container" style="margin-top: 20px;">
                <div style="background-image: linear-gradient(302deg, rgba(245, 217, 91, 1) 0%, rgba(116, 249, 243, 1) 100%); padding-left: 5rem; padding-right: 5rem; padding-top: 1.25rem; padding-bottom: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid black; padding-bottom: 1.25rem;">
                        <div>
                            <p style="margin: 0px; font-size: 1.125rem; line-height: 1.75rem; font-weight: bold;">${profile.full_name}</p>
                            <p style="margin: 0px;">${profile.professionTitle}</p>
                        </div>
                        <div style="text-align: right;">
                            <p style="margin: 0px; font-weight: bold;">${profile.email}</p>
                            <p style="margin: 0px;">${profile.phoneNumber}</p>
                        </div>
                    </div>

                    <div style="padding-top: 1.25rem;">
                        <p style="margin: 0px; font-size: 0.75rem; line-height: 1rem;">${profile.location}</p>
                    </div>


                    <div style="font-size: 0.75rem; line-height: 1rem; margin-top: 5rem;" >
                        <p style="font-weight: 600; margin: 0px;">To ${addressTo}</p>
                        <p style="font-size: 1.125rem; line-height: 1.75rem; margin-top: 1.25rem; margin-bottom: 1.25rem;">06/12/2022</p>
                        <p style="margin-bottom: 0.5rem;" >Dear ${addressTo}</p>
                        <p>`
                        coverLetterContent
                        .filter((skill) => skill.checked === true)
                        .map((skill) => (
                            template+=`${skill.coverLetter}`
                        ))
                        template+=`</p>
                    </div>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
                integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
                crossorigin="anonymous"></script>
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

export default PdfGenerationTemplateThree;