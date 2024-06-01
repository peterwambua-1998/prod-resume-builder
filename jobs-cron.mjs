import { query, collection, where, getFirestore, getDocs, addDoc } from 'firebase/firestore';
import { launch } from 'puppeteer';
import { getAuth } from 'firebase/auth';
import { getApps, getApp, initializeApp } from 'firebase/app';
import 'dotenv/config';

// firebase config
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// initialize apis
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// jobs array
let jobs = [];

// crawl jobs
const url = 'https://www.summitrecruitment-search.com/jobs/search-area/kenya';

// launch puppeteer
const browser = await launch();
const page = await browser.newPage();
await page.goto(url,{waitUntil: 'networkidle0'});

const allJobs = await page.evaluate(() => {
    const jobs = document.querySelectorAll('article');
    return Array.from(jobs).map((job) => {
        const title = job.querySelector('.entry-title a').innerText;
        const text = job.querySelector('.jobs-meta p').innerText;
        const link = 'https://www.summitrecruitment-search.com/jobs/search-area/kenya/';
        return {title, text, link};
    });
});

await browser.close();

allJobs.forEach((job) =>   {
    jobs.push(job);
})


for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const jobsRef = collection(db, "all-jobs");
    const q = query(jobsRef, where("title", "==", job.title));
    const docSnap = await getDocs(q);
    if (docSnap.size == 0) {
        await addDoc(jobsRef, {
            'title': job.title,
            'description': job.text,
            'link': job.link
        });
    }
}

process.exit(1);