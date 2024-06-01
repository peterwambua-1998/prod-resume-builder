import { db } from '@/app/firebase/firebase';
import { query, collection, where, getFirestore, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { launch } from 'puppeteer';

export async function GET(req) {
    try {
        let jobs = [];
        // crawl jobs
        const url = 'https://www.summitrecruitment-search.com/jobs/search-area/kenya';

        // launch puppeteer
        const browser = await launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });

        const allJobs = await page.evaluate(() => {
            const jobs = document.querySelectorAll('article');
            return Array.from(jobs).map((job) => {
                const title = job.querySelector('.entry-title a').innerText;
                const text = job.querySelector('.jobs-meta p').innerText;
                const link = 'https://www.summitrecruitment-search.com/jobs/search-area/kenya/';
                return { title, text, link };
            });
        });

        await browser.close();

        allJobs.forEach((job) => {
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
                    'link': job.link,
                    'created_at': Timestamp.now()
                });
            }
        }

        return Response.json(true,{status: 200});
    } catch (error) {
        console.log(error);
        return Response.json(false,{status: 500});
    }
}