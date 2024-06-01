'use client'
import { db } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Button, Loading } from "react-daisyui";
import { aboutGlobal, awardsGlobal, educationGlobal, experiencesGlobal, hobbiesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, projectsGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "@/app/dashboard/cv-create/proceed/templates/helpers/helpers";
import FileSaver from "file-saver";
import { useRouter } from "next/navigation";


const GeneratePDF = ({userId, aboutAI, skillsAi}) => {
    const [mDownload, setMDownload] = useState(false);
    const router = useRouter();

    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
    }
  

    async function downloadPDF() {
        
        setMDownload(true);

        let subDoc = await getDoc(doc(db, 'subscriptions', userId));
        // take user to subscription page to begin payment
        if (subDoc.exists() == false) {
            return router.replace('/dashboard/subscription');
        }
        
        let about = aboutAI;

        let profile = await profileGlobal(userId);

        let skills = skillsAi;

        let awards = await awardsGlobal(userId);

        let memberships = await membershipsGlobal(userId);

        let languages = await languagesGlobal(userId);

        let education = await educationGlobal(userId);

        let experiences = await experiencesGlobal(userId);

        let internships = await internshipsGlobal(userId);

        let publications = await publicationsGlobal(userId);

        let links = await linksGlobal(userId);

        let projects = await projectsGlobal(userId);

        let hobbies = await hobbiesGlobal(userId);

        let references = await referencesGlobal(userId);

        let base64Image;
        if (profile.file_url) {
            base64Image = getBase64Image(document.getElementById('profile-temp-five'))
        } else {
            base64Image = 'data:image/png;base64,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'
        }

        let template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            
            <script src="https://kit.fontawesome.com/6557f5a19c.js" crossorigin="anonymous"></script>
        </head>
        <body>
            <div class="">
                <div class="row" style="background-color: white;">
                    <!-- grid one -->
                    <div style="background-color: #1E1B4B; color: white; font-size: 0.875rem; line-height: 1.25rem; padding: 0.001rem;" class="col-md-4  text-sm p-5">
                            <div style="width: 100%; display: flex; justify-content: center;">
                                <img src="${base64Image}" width=120 height=120 alt="profile-image" style="border-radius: 100%; width: 60%;" />
                            </div>
                        
                            <p style="margin-top: 0.5rem; font-size: 1rem; line-height: 1.5rem; font-weight: bold; text-align: center;">Programmer</p>
                            <!-- skills -->`
                            skills.length > 0 ?
                            template+=`
                            <div style="margin-top: 2rem; padding-left: 0.002rem; padding-right: 0.002rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Skills</p>
                                <!-- loop -->
                                `: '';
                                // skills
                                skills.filter((skill) => skill.checked === true)
                                .map((skill, index) => {
                                    template += `
                                    <div  style="padding-left: 0.1rem; padding-right: 0.1rem;">
                                        <div style="margin-bottom: 1.25rem;">
                                            <p style="font-weight: bold; font-size: 0.875rem; line-height: 1.25rem;" class=" lg:text-sm tracking-wide">${skill.skill}</p>
                                            <div style="width: 100%; background-color: black; border-top-left-radius: 36px; border-top-right-radius: 36px; border-bottom-right-radius: 36px; border-bottom-left-radius: 36px; height: 0.625rem; margin-top: 0.25rem;">
                                                <div style="background-color: #4F46E5; height: 0.625rem; border-top-left-radius: 36px; border-top-right-radius: 36px; border-bottom-right-radius: 36px; border-bottom-left-radius: 36px; width: ${skill.level}%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    `;
                                });
                            template += `
                            <!-- loop -->
                            </div>
                            <!-- skills -->`
                            awards.length > 0 ?
                            template+=`
                            <!-- awards -->
                            <div style="margin-top: 2.5rem; padding-left: 0.05rem; padding-right: 0.05rem;">
                                    <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Awards</p>
                            `: '';

                            // awards
                            awards.map((award, index) => {
                                template += `    
                                    <!-- loop -->
                                    <div style="padding-left: 0.1rem; padding-right: 0.1rem; margin-bottom: 1.25rem;" key={index}> 
                                        <p style="font-weight: bold; font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${award.award}</p>
                                        <p style="font-size: 0.875rem; line-height: 1.25rem; color: #808080;" >${award.description}</p>
                                    </div>
                                    <!-- loop -->
                                `;
                            });


                            awards.length > 0 ?
                            template += `
                            </div>
                            <!-- awards -->`: ''
                            hobbies.length > 0 ?
                            template+=`
                            <!-- hobbies -->
                            <div style="margin-top: 2.5rem; padding-left: 0.05rem; padding-right: 0.05rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Hobbies</p>
                                <!-- loop -->`: ''

                                    //hobbies
                                    hobbies.map((hobby, index) => {
                                        template += `             
                                            <div style="padding-left: 0.1rem; padding-right: 0.1rem; margin-bottom: 1.25rem;" key={index}>
                                                <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${hobby.title}</p>
                                            </div>
                                            <!-- loop -->
                                        `;
                                    })


                            hobbies.length > 0 ?
                            template += `
                            </div>
                            <!-- hobbies -->`: ''
                            languages.length > 0 ?
                            template+=`
                            <!-- languages -->
                            <div style="margin-top: 2.5rem; padding-left: 0.05rem; padding-right: 0.05rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Languages</p>
                                <!-- loop -->`: '';
                                    languages.map((lang, index) => {
                                        template += `
                                        <div style="padding-left: 0.1rem; padding-right: 0.1rem; margin-bottom: 1.25rem; display: flex; gap: 0.5rem;" key={index}>
                                            <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${lang.name}</p>
                                            <p style="color: #808080; font-size: 0.75rem; line-height: 1rem;">(${lang.description})</p>
                                        </div>
                                        <!-- loop -->
                                        `;
                                    })
                            languages.length > 0 ?
                            template +=
                            ` 
                            </div>
                            <!-- languages -->`: ''
                            memberships.length > 0 ?
                            template+=`
                            <!-- memberships -->
                            <div style="margin-top: 2.5rem; padding-left: 0.05rem; padding-right: 0.05rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Memberships</p>
                                <!-- loop -->`: '';
                                memberships.map((membership, index) => {
                                    template +=
                                        `                
                                    <div style="padding-left: 0.1rem; padding-right: 0.1rem; margin-bottom: 1.25rem; display: flex; gap: 0.5rem;" key={index}>
                                        <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${membership.organization}</p>
                                    </div>
                                    `;
                                });

                            memberships.length > 0 ?
                            template += `<!-- loop -->
                            </div>
                            <!-- memberships -->`: ''
                            
                            template+=`
                    </div>
                    <!-- grid one -->
        
        
                    <!-- grid two -->
                    <div style="padding-left: 2.5rem; padding-right: 2.5rem; padding-top: 1.25rem;" class="col-md-8">
                        <p style="font-weight: bolder; font-size: 1.25rem; line-height: 1.75rem; margin-bottom: 2rem; color: #1E1B4B;" >${profile.full_name}</p>
                        <div style="margin: 0px; padding: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; font-size: 0.75rem; line-height: 1rem; width: 100%;">
                            <div style="display: flex;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28%; height: 28%; padding-top: 0.3%"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                                <p style="font-size: 12px;">${profile.phoneNumber}</p>
                            </div>
                            <div style="display: flex;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28%; height: 28%; padding-top: 0.3%">
                                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                                </svg>
                                <p style="font-size: 12px;">${profile.email}</p>
                            </div>
                            <div style="display: flex;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28%; height: 28%; padding-top: 0.3%"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                                <p style="font-size: 12px;">${profile.location}</p>
                            </div>
                        </div>
        
                        <!-- about -->
                        <div style="margin-top: 1rem;">
                            <p style="font-size: 0.75rem; line-height: 1rem; color: #808080;">`
                            about
                            .filter((ab) => ab.checked === true)
                            .map((ab) => (
                                template += `
                                        ${ab.about}
                                    `
                            ));
                            template+=`
                            </p>
                        </div>
                        <!-- about -->
        
                        <!-- experience -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Work Experience</p>
                            <!-- loop -->`;
                            experiences.map((exp, index) => {
                                template += `                
                                <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                                    <div style="margin-bottom: 1.5rem;">
                                        <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${exp.title}, ${exp.companyName}</p>
                                        <p style="font-size: 0.75rem; line-height: 1rem; color: #808080; margin-bottom: 0.5rem;">${exp.location} (${exp.startDate} - ${exp.endDate})</p>
                                        <p style="font-size: 0.75rem; line-height: 1rem;">
                                        ${exp.description}
                                        </p>
                                    </div>
                                </div>
                                `;
                            });

                            template += `
                            <!-- loop -->
                        </div>
                        <!-- experience -->
        
        
                        <!-- education -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Education</p>
                            <!-- loop -->`;
                            education.map((edu, index) => {
                                template +=
                                    `
                                
                                <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                                    <div style="margin-bottom: 1.5rem;">
                                        <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${edu.degree}, ${edu.fieldStudy}</p>
                                        <p style="font-size: 0.75rem; line-height: 1rem; color: #808080; margin-bottom: 0.5rem;">${edu.school} (${edu.startDate} - ${edu.endDate})</p>
                                        <p style="font-size: 0.75rem; line-height: 1rem;">
                                        ${edu.descriptionEdu}
                                        </p>
                                    </div>
                                </div>
                                `;
                            });

                            template += `
                            <!-- loop -->
                        </div>
                        <!-- education -->`
                        
                        internships.length > 0 ?
                        template+=`
                        <!-- internship -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Internship</p>
                            <!-- loop -->`: '';

                            internships.map((internship, index) => {
                                template += `
                                <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                                    <div style="margin-bottom: 1.5rem;">
                                        <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${internship.organization}, ${internship.role}</p>
                                        <p style="font-size: 0.75rem; line-height: 1rem; color: #808080; margin-bottom: 0.5rem;">${internship.duration} month(s)</p>
                                        <p style="font-size: 0.75rem; line-height: 1rem;">
                                        ${internship.description}
                                        </p>
                                    </div>
                                </div>
                                `;
                            });

                            internships.length > 0 ?
                            template += `
                            <!-- loop -->
                        </div>
                        <!-- internship -->`: ''
                        publications.length > 0 ?
                        template+=`
                        <!-- publication -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Publications</p>
                            <!-- loop -->`: '';

                            publications.map((publication, index) => {
                                template += `
                            <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                                <div style="margin-bottom: 1.5rem;">
                                    <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${publication.title}</p>
                                    <p style="font-size: 0.75rem; line-height: 1rem;">
                                        ${publication.link}
                                    </p>
                                </div>
                            </div>
                            `;
                            });


                            publications.length > 0 ?
                            template += `
                            <!-- loop -->
                        </div>
                        <!-- publication -->`: ''
                        links.length > 0 ?
                        template+=`
                        <!-- Links -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Links</p>
                            <!-- loop -->`: '';

                                links.map((link, index) => {
                                    template += `
                                <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                                    <div style="margin-bottom: 1.5rem;">
                                        <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${link.name}</p>
                                        <p style="font-size: 0.75rem; line-height: 1rem;">
                                            ${link.link}
                                        </p>
                                    </div>
                                </div>
                                `;
                                });
                            links.length > 0 ?
                            template += `
                            <!-- loop -->
                        </div>
                        <!-- Links -->`: ''
                        projects.length > 0 ?
                        template+=`
                        <!-- Projects -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Projects</p>
                            <!-- loop -->`: '';
                            projects.map((project, index) => {
                                template += `
                                <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                                    <div style="margin-bottom: 1.5rem;">
                                        <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${project.title}</p>
                                        <p style="font-size: 0.75rem; line-height: 1rem;">
                                            ${project.description}
                                        </p>
                                    </div>
                                </div>
                            `;
                            });


                            projects.length > 0 ?
                            template += `
                            <!-- loop -->
                        </div>
                        <!-- Projects -->
                            `: ''
                        references.length > 0 ?
                        template+=`
                        <div style="margin-top: 2rem; margin-bottom: 2.5rem;">
                        <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">References</p>
                                   
                                <div class="pr-2 pl-2 md:pl-4 md:pr-4 lg:pl-4 lg:pr-4 flex flex-wrap gap-8">
                                `: '';

                                    references.map((refrence, index) => {
                                        template += `
                                        <div class="text-xs" key={index}>
                                            <p style="font-size: 0.875rem; line-height: 1.25rem; font-wight: bold; margin-bottom: 0.5rem">${refrence.referee_name}</p>
                                            <p style="font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem" >${refrence.organization}</p>
                                            <p style="font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem">${refrence.role}</p>
                                            <p style="font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem">${refrence.email}</p>
                                            <p style="font-size: 0.75rem; line-height: 1rem;">${refrence.phone}</p>
                                        </div>`;
                                    });

                                references.length > 0 ?
                                template += `
                                </div> 
                            </div>`: ''
                            template+=`
                    </div>
                    <!-- grid two -->
                </div>
            </div>
        
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
        </body>
        </html>
        `;

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    "template": template,
                }),
            };

            let aboutAIs = await fetch('/api/puppeteer', options);
            let blob = await aboutAIs.blob();
            FileSaver.saveAs(blob, "cv.pdf");
            setMDownload(false);
        } catch (error) {
            console.log(error);
        }
    }


    return (  
        <Button onClick={() => downloadPDF()} color="primary">
            {mDownload == true ? <Loading /> : ''}
            download pdf
        </Button>
    );
}
 
export default GeneratePDF;




        // skills
        


        
                        // <!-- about -->
                        // <div style="margin-top: 2rem;">
                        //     <p style="font-size: 0.75rem; line-height: 1rem; color: #808080;">`;
                            
                        //     template+=`
                        //     `
                            
                        //     template+=`</p>
                        // </div>
                        // <!-- about -->
        
                        