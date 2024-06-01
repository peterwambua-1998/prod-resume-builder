const puppeteer = require('puppeteer');

export async function GET(req, res) {
    const url = 'https://www.summitrecruitment-search.com/jobs/search-area/kenya/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url,{waitUntil: 'networkidle0'});
    //https://www.linkedin.com/jobs/search?keywords=programming&location=kenya
    // await Promise.all([
    //     page.waitForNavigation({
    //         waitUntil: 'domcontentloaded'
    //     }),
    //     page.click('a[href="https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs"]')
    // ]);

    await page.setRequestInterception(true);

    page.on('request', request => {
        if (request.isNavigationRequest() && request.redirectChain().length !== 0) {
            request.abort();
        } else {
            request.continue();
        }
    });
   
    
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
    console.log(allJobs);
    return new Response(JSON.stringify(allJobs));
}
