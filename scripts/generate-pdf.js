const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Loading the local HTML file
    const htmlPath = 'file://' + path.join(__dirname, 'comparison_template.html');
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });

    // Generating PDF
    const pdfPath = path.join(__dirname, '../static/comparatif_vibe_coding.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '10mm',
            bottom: '10mm',
            left: '10mm',
            right: '10mm'
        }
    });

    await browser.close();
    console.log(`PDF Generated successfully at: ${pdfPath}`);
})();
