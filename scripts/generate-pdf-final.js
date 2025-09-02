const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins',
      '--disable-site-isolation-trials'
    ]
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport exactly to A4 size
    await page.setViewport({
      width: 794, // A4 width at 96 DPI
      height: 1123, // A4 height at 96 DPI
      deviceScaleFactor: 1
    });
    
    console.log('Navigating to flyer page...');
    
    // Navigate and wait for everything to load
    await page.goto('http://localhost:3000/marketing/ellepot-flyer', {
      waitUntil: ['networkidle2', 'domcontentloaded', 'load'],
      timeout: 60000
    });
    
    // Wait for the print page to be visible
    await page.waitForSelector('.print-page', { 
      visible: true,
      timeout: 30000 
    });
    
    console.log('Page loaded, waiting for styles...');
    
    // Extra wait for all styles and fonts to load
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Hide elements that shouldn't be in PDF
    await page.evaluate(() => {
      // Hide the download button
      const downloadBtn = document.querySelector('.no-print');
      if (downloadBtn) {
        downloadBtn.style.display = 'none';
      }
      
      // Remove any box shadows on the main container for cleaner PDF
      const printPage = document.querySelector('.print-page');
      if (printPage) {
        printPage.style.boxShadow = 'none';
        printPage.style.margin = '0';
      }
      
      // Ensure body has no margins
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.background = 'white';
    });
    
    // Wait for any layout shifts
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Generating PDF...');
    
    // Generate PDF with specific settings
    await page.pdf({
      path: path.join(__dirname, '..', 'public', 'downloads', 'ellepot-fp12-folder.pdf'),
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      scale: 1,
      preferCSSPageSize: true,
      omitBackground: false
    });
    
    console.log('PDF generated successfully!');
    
    // Also take a screenshot for debugging
    await page.screenshot({
      path: path.join(__dirname, '..', 'public', 'downloads', 'ellepot-debug.png'),
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 794,
        height: 1123
      }
    });
    
    console.log('Debug screenshot saved');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error('Stack trace:', error.stack);
  } finally {
    await browser.close();
  }
}

// Run the function
generatePDF();