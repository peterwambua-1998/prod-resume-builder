import OpenAI from 'openai';
import { query, collection, where, getFirestore, getDocs, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebase';

export async function GET(req) {

    const openAi = new OpenAI({ apiKey: process.env.NEXT_OPEN_AI_API_KEY });
    let jobs = [];
    try {

        // get all jobs
        const jobsRef = collection(db, "all-jobs");
        const storedJobsSnapshot = await getDocs(jobsRef);
        storedJobsSnapshot.forEach((doc) => {
            jobs.push(JSON.stringify(doc.data()));
        });

        // get all users
        let userIds = [];

        const querySnapshot = await getDocs(collection(db, "user-ids"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            userIds.push(doc.id);
        });

        for (let i = 0; i < userIds.length; i++) {
            const userId = userIds[i];
            let experiences = [];
            let education = [];
            let skills = [];
            // get user experiences
            const q = query(collection(db, "experience"), where("user_id", "==", userId));
            const expSnapshot = await getDocs(q);
            expSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                experiences.push(JSON.stringify(doc.data()));
            });

            // get user education
            const e = query(collection(db, "education"), where("user_id", "==", userId));
            const eduSnapshot = await getDocs(e);
            eduSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                education.push(JSON.stringify(doc.data()));
            });


            // get user education
            const s = query(collection(db, "skill"), where("user_id", "==", userId));
            const skillsSnapshot = await getDocs(s);
            skillsSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                skills.push(doc.data()['name']);
            });


            const completion = await openAi.chat.completions.create({
                model: 'gpt-3.5-turbo',
                response_format: { type: "json_object" },
                messages: [
                    { role: "system", content: "Always return jobs that i provide. Always return JSON like {'selected_jobs'}." },
                    { role: 'user', content: `so i have an array of jobs ${jobs}, experiences array ${experiences}, education array ${education} and skills array  ${skills}. I would like you to select the jobs that satisfy my experiences and skills just return a list of the jobs. Don't return dummy jobs but return jobs in the jobs list provided. Ensure you check that job deadline has not passed. Ensure you match jobs according to my skills first then experience and education` },

                ],
                temperature: 1,
                max_tokens: 2150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,

            });
            let matchJon = JSON.parse(completion.choices[0].message.content);
            for (let j = 0; j < matchJon.selected_jobs.length; j++) {
                let job = matchJon.selected_jobs[j];
                const jobsRef = collection(db, "user-jobs");
                const q = query(jobsRef, where("title", "==", job.title), where('user_id', '==', userId));
                const docSnap = await getDocs(q);
                if (docSnap.size == 0) {
                    let jobData = {
                        'title': job.title,
                        'description': job.description,
                        'link': job.link,
                        'user_id': userId,
                        'created_at': Timestamp.now()
                    }
                    let newCityRef = doc(collection(db, "user-jobs"));
                    await setDoc(newCityRef, jobData);
                }
            }

        }

        return Response.json(true,{status: 200});
    } catch (error) {
        console.log(error);
        return Response.json(false,{status: 200});
    }
}