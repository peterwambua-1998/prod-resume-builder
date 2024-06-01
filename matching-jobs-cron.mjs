import OpenAI from 'openai';
import 'dotenv/config';
import { getAuth } from 'firebase/auth';
import { getApps, getApp, initializeApp } from 'firebase/app'
import { query, collection, where, getFirestore, getDocs, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';

/**
 * configs
 */
const openAi = new OpenAI({ apiKey: process.env.NEXT_OPEN_AI_API_KEY });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

/**
 * matching
 */
let jobs = [];

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


    try {
        const completion = await openAi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: "Always return jobs that i provide. Always return JSON like {'selected_jobs'}." },
                { role: 'user', content: `so i have an array of jobs ${jobs}, experiences array ${experiences}, education array ${education} and skills array  ${skills}. I would like you to select the jobs that satisfy my experiences and skills just return a list of the jobs. Don't return dummy jobs but return jobs in the jobs list provided. Ensure you check that job deadline has not passed` },

            ],
            temperature: 0.65,
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
    } catch (error) {
        console.log(error);
    }
}

process.exit(1);