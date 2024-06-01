'use client'
import { db, app } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import FileSaver from "file-saver";
import { profileGlobal } from "../../cv-create/proceed/templates/helpers/helpers";


const PdfGenerationTemplateOne = ({ userId, addressTo, coverLetterContent }) => {
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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet">
</head>

<body>
    <div class="container" style="margin-top: 20px;">
        <div
            style="background-color: #0f172a; padding-left: 5rem; color: white; padding-right: 5rem; padding-top: 1.25rem; padding-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between;">
                <div>`
                
                template+=`
                    <p>${profile.professionTitle}</p>
                    `;
                    
                template+=`
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0px;">${profile.location}</p>
                    <p style="margin: 0px;">${profile.email}</p>
                    <p style="margin: 0px;">${profile.phoneNumber}</p>
                </div>
            </div>

            <div style="font-family: Playfair Display, serif; margin-top: 7rem; font-weight: bolder; font-size: 3rem; line-height: 1;"
                className="my-font-two">
                <p>${profile.full_name}</p>
                
            </div>

            <div class="row">
                <div class="col-md-4">
                    <p style="font-size: 0.75rem; line-height: 1rem;">to</p>
                    <p>Mr. ${addressTo}</p>
                </div>
                <div class="col-md-8">
                    <p>06/12/2022</p>
                    <p style="margin-top: 1.25rem;">Dear Mr. ${addressTo},</p>
                    <p>`
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

export default PdfGenerationTemplateOne;