import puppeteer from "puppeteer";

export async function POST(req, res) {
    let reqBody = await req.json();
    let {template} = reqBody
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template, {waitUntil: 'domcontentloaded'})


    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        timeout: 0,
    });

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');

    return new Response(pdfBuffer, headers);
}