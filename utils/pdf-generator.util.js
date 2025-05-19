const puppeteer = require('puppeteer')

async function generatePdf (url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url, {
        waitUntil: 'networkidle2',
      })

    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true
      })
    
    await browser.close()

    return pdf
}

module.exports = {
    generatePdf
}