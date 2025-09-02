const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to A4 size
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
    });
    
    // Navigate to the flyer page
    await page.goto('http://localhost:3000/marketing/ellepot-flyer', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });
    
    // Wait for content to load and styles to apply
    await page.waitForSelector('.print-page', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 3000)); // Give extra time for all styles to load
    
    // Remove the print button and any other non-print elements
    await page.evaluate(() => {
      const noPrintElements = document.querySelectorAll('.no-print');
      noPrintElements.forEach(el => {
        el.style.display = 'none';
      });
    });
    
    // Force all images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          }))
      );
    });
    
    // Wait a bit more to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate PDF with specific options for better quality
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      preferCSSPageSize: false,
      scale: 1,
      deviceScaleFactor: 2 // Higher quality
    });
    
    // Create public directory if it doesn't exist
    const publicDir = path.join(__dirname, '..', 'public', 'downloads');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Save PDF
    const pdfPath = path.join(publicDir, 'ellepot-fp12-folder.pdf');
    fs.writeFileSync(pdfPath, pdfBuffer);
    
    console.log(`PDF generated successfully at: ${pdfPath}`);
    console.log(`PDF size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

// Run the function
generatePDF();