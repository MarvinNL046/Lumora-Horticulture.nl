const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to A4 size
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      deviceScaleFactor: 2
    });
    
    // Add CSS for print media
    await page.emulateMediaType('print');
    
    // Navigate to the flyer page
    console.log('Navigating to flyer page...');
    await page.goto('http://localhost:3000/marketing/ellepot-flyer', {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000
    });
    
    // Wait for the specific content container
    console.log('Waiting for content to load...');
    await page.waitForSelector('.print-page', { timeout: 10000 });
    
    // Additional wait for all resources
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Inject additional print styles to ensure proper rendering
    await page.addStyleTag({
      content: `
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-page {
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `
    });
    
    // Remove non-printable elements
    await page.evaluate(() => {
      // Remove print button
      const noPrintElements = document.querySelectorAll('.no-print');
      noPrintElements.forEach(el => el.remove());
      
      // Ensure all background colors are preserved
      document.querySelectorAll('*').forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          el.style.setProperty('background-color', styles.backgroundColor, 'important');
        }
      });
    });
    
    // Wait for all images to load completely
    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve); // Resolve even on error to not block
          setTimeout(resolve, 5000); // Timeout after 5 seconds
        });
      }));
    });
    
    console.log('Generating PDF...');
    
    // Generate PDF with high quality settings
    const pdfBuffer = await page.pdf({
      path: path.join(__dirname, '..', 'public', 'downloads', 'ellepot-fp12-folder.pdf'),
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      preferCSSPageSize: false,
      scale: 1
    });
    
    console.log(`PDF generated successfully!`);
    console.log(`PDF size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    
    // Also save a screenshot for comparison
    await page.screenshot({
      path: path.join(__dirname, '..', 'public', 'downloads', 'ellepot-preview.png'),
      fullPage: true
    });
    
    console.log('Screenshot saved for comparison');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error('Make sure the development server is running on http://localhost:3000');
  } finally {
    await browser.close();
  }
}

// Run the function
generatePDF();