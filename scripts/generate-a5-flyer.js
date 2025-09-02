const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Read the logo as base64
const logoPath = path.join(__dirname, '..', 'public', 'logo', 'lumura-horticulture-logo.jpeg');
const logoBase64 = fs.readFileSync(logoPath, 'base64');
const logoDataUrl = `data:image/jpeg;base64,${logoBase64}`;

// Read product image as base64
const productImagePath = path.join(__dirname, '..', 'public', 'productAfbeeldingen', 'trays', 'tray84', 'lumorahorticulture-tray84.jpg');
const productImageBase64 = fs.readFileSync(productImagePath, 'base64');
const productImageDataUrl = `data:image/jpeg;base64,${productImageBase64}`;

// Complete HTML for the A5 flyer
const flyerHTML = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ellepot FP 12+ - Lumora Horticulture</title>
    <style>
        @page {
            size: A5;
            margin: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            width: 148mm;
            height: 210mm;
            margin: 0;
            padding: 0;
            background: white;
            color: #333;
        }
        
        .page {
            width: 148mm;
            height: 210mm;
            position: relative;
            overflow: hidden;
            background: white;
            padding: 15mm;
        }
        
        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15mm;
        }
        
        .logo {
            height: 25mm;
            width: auto;
        }
        
        .header-right {
            text-align: right;
        }
        
        .header-right h3 {
            font-size: 14pt;
            color: #1a3d1a;
            margin-bottom: 2mm;
        }
        
        .header-right p {
            font-size: 10pt;
            color: #666;
        }
        
        /* Title Section */
        .title-section {
            text-align: center;
            margin-bottom: 12mm;
        }
        
        h1 {
            font-size: 24pt;
            color: #1a3d1a;
            margin-bottom: 3mm;
            font-weight: 700;
        }
        
        .subtitle {
            font-size: 12pt;
            color: #666;
            font-weight: 300;
        }
        
        /* Introduction */
        .intro {
            font-size: 10pt;
            line-height: 1.6;
            margin-bottom: 10mm;
            text-align: center;
            color: #444;
        }
        
        .intro strong {
            color: #1a3d1a;
            font-weight: 600;
        }
        
        /* Features Grid */
        .features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8mm;
            margin-bottom: 10mm;
        }
        
        .feature {
            background: #f8fdf8;
            border: 1px solid #d4e4d4;
            border-radius: 8px;
            padding: 8mm;
            text-align: center;
        }
        
        .feature-icon {
            font-size: 20pt;
            margin-bottom: 4mm;
        }
        
        .feature h3 {
            font-size: 10pt;
            font-weight: 600;
            margin-bottom: 2mm;
            color: #1a3d1a;
        }
        
        .feature p {
            font-size: 8pt;
            line-height: 1.4;
            color: #666;
        }
        
        /* Product Image */
        .product-section {
            text-align: center;
            margin-bottom: 10mm;
        }
        
        .product-image {
            width: 100mm;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* Applications */
        .applications {
            margin-bottom: 10mm;
        }
        
        .applications h3 {
            font-size: 12pt;
            font-weight: 600;
            margin-bottom: 5mm;
            color: #1a3d1a;
            text-align: center;
        }
        
        .applications-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3mm;
        }
        
        .application-item {
            display: flex;
            align-items: center;
            gap: 3mm;
            font-size: 9pt;
        }
        
        .checkmark {
            color: #2d5a2d;
            font-size: 12pt;
            font-weight: bold;
        }
        
        /* Footer */
        .footer {
            position: absolute;
            bottom: 15mm;
            left: 15mm;
            right: 15mm;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 8mm;
            border-top: 1px solid #e0e0e0;
        }
        
        .contact-info {
            font-size: 8pt;
            line-height: 1.6;
            color: #666;
        }
        
        .qr-section {
            text-align: center;
        }
        
        .qr-section p {
            font-size: 7pt;
            margin-bottom: 2mm;
            color: #666;
        }
        
        .qr-code {
            background: white;
            padding: 4px;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="page">
        <!-- Header -->
        <div class="header">
            <img src="${logoDataUrl}" alt="Lumora Horticulture" class="logo">
            <div class="header-right">
                <h3>Ellepot® FP 12+</h3>
                <p>Milieuvriendelijke verpakking</p>
            </div>
        </div>
        
        <!-- Title -->
        <div class="title-section">
            <h1>Paperbus Steenwol Pluggen</h1>
            <p class="subtitle">Met innovatief Ellepot FP 12+ papier</p>
        </div>
        
        <!-- Introduction -->
        <div class="intro">
            Al onze <strong>paperbus steenwol pluggen</strong> zijn verpakt met 
            <strong>Ellepot FP 12+ papier</strong> – een duurzame oplossing 
            voor sterke en gezonde planten.
        </div>
        
        <!-- Features -->
        <div class="features">
            <div class="feature">
                <div class="feature-icon">🌱</div>
                <h3>Milieuvriendelijk</h3>
                <p>Houtvezels uit hernieuwbare bronnen</p>
            </div>
            
            <div class="feature">
                <div class="feature-icon">⏰</div>
                <h3>12+ Maanden</h3>
                <p>Perfecte afbraaktijd voor kweek</p>
            </div>
            
            <div class="feature">
                <div class="feature-icon">🛡️</div>
                <h3>Schimmelwerend</h3>
                <p>Beschermt jonge planten</p>
            </div>
            
            <div class="feature">
                <div class="feature-icon">🌿</div>
                <h3>Geen Shock</h3>
                <p>Wortels groeien door papier</p>
            </div>
        </div>
        
        <!-- Product Image -->
        <div class="product-section">
            <img src="${productImageDataUrl}" alt="Lumora Steenwol Pluggen" class="product-image">
        </div>
        
        <!-- Applications -->
        <div class="applications">
            <h3>Geschikt voor:</h3>
            <div class="applications-grid">
                <div class="application-item">
                    <span class="checkmark">✓</span>
                    <span>Groentekwekerijen</span>
                </div>
                <div class="application-item">
                    <span class="checkmark">✓</span>
                    <span>Sierteelt</span>
                </div>
                <div class="application-item">
                    <span class="checkmark">✓</span>
                    <span>Boomkwekerijen</span>
                </div>
                <div class="application-item">
                    <span class="checkmark">✓</span>
                    <span>Hobbytuiniers</span>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="contact-info">
                <p>✉ info@lumorahorticulture.com</p>
                <p>🌐 lumorahorticulture.nl</p>
                <p>📱 +31 6 38382564</p>
            </div>
            
            <div class="qr-section">
                <p>Meer info:</p>
                <div class="qr-code">
                    <svg width="50" height="50" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
                        <!-- QR Code for https://lumorahorticulture.nl/producten/ellepot-fp12 -->
                        <rect width="29" height="29" fill="white"/>
                        <path d="M0 0h7v1h-7zM8 0h1v1h-1zM11 0h2v1h-2zM14 0h1v1h-1zM16 0h2v1h-2zM19 0h1v1h-1zM22 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM10 1h1v1h-1zM12 1h3v1h-3zM16 1h2v1h-2zM19 1h1v1h-1zM22 1h1v1h-1zM28 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h2v1h-2zM11 2h1v1h-1zM14 2h1v1h-1zM16 2h1v1h-1zM18 2h3v1h-3zM22 2h1v1h-1zM24 2h3v1h-3zM28 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM9 3h2v1h-2zM12 3h2v1h-2zM16 3h5v1h-5zM22 3h1v1h-1zM24 3h3v1h-3zM28 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h1v1h-1zM10 4h4v1h-4zM15 4h1v1h-1zM17 4h1v1h-1zM19 4h2v1h-2zM22 4h1v1h-1zM24 4h3v1h-3zM28 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM9 5h1v1h-1zM11 5h1v1h-1zM13 5h2v1h-2zM16 5h2v1h-2zM19 5h1v1h-1zM22 5h1v1h-1zM28 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h7v1h-7zM9 7h2v1h-2zM13 7h1v1h-1zM15 7h1v1h-1zM18 7h1v1h-1zM20 7h1v1h-1zM0 8h1v1h-1zM2 8h2v1h-2zM5 8h2v1h-2zM8 8h1v1h-1zM10 8h1v1h-1zM13 8h1v1h-1zM18 8h1v1h-1zM20 8h2v1h-2zM24 8h1v1h-1zM26 8h2v1h-2zM0 9h1v1h-1zM3 9h1v1h-1zM5 9h2v1h-2zM8 9h1v1h-1zM11 9h3v1h-3zM15 9h4v1h-4zM20 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM26 9h1v1h-1zM28 9h1v1h-1zM1 10h2v1h-2zM4 10h1v1h-1zM7 10h3v1h-3zM12 10h2v1h-2zM15 10h1v1h-1zM17 10h1v1h-1zM19 10h1v1h-1zM22 10h3v1h-3zM26 10h2v1h-2zM1 11h1v1h-1zM5 11h2v1h-2zM8 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM15 11h3v1h-3zM20 11h1v1h-1zM24 11h1v1h-1zM26 11h1v1h-1zM28 11h1v1h-1zM0 12h2v1h-2zM3 12h1v1h-1zM5 12h1v1h-1zM7 12h2v1h-2zM10 12h4v1h-4zM16 12h5v1h-5zM22 12h1v1h-1zM24 12h3v1h-3zM0 13h3v1h-3zM6 13h1v1h-1zM10 13h2v1h-2zM13 13h1v1h-1zM16 13h1v1h-1zM18 13h1v1h-1zM22 13h1v1h-1zM24 13h2v1h-2zM27 13h2v1h-2zM2 14h4v1h-4zM7 14h1v1h-1zM9 14h4v1h-4zM14 14h1v1h-1zM16 14h2v1h-2zM19 14h2v1h-2zM22 14h2v1h-2zM25 14h3v1h-3zM1 15h3v1h-3zM5 15h2v1h-2zM8 15h2v1h-2zM11 15h1v1h-1zM13 15h1v1h-1zM16 15h1v1h-1zM20 15h1v1h-1zM22 15h1v1h-1zM25 15h1v1h-1zM0 16h3v1h-3zM4 16h2v1h-2zM7 16h3v1h-3zM11 16h1v1h-1zM13 16h3v1h-3zM17 16h1v1h-1zM20 16h1v1h-1zM22 16h2v1h-2zM26 16h3v1h-3zM1 17h1v1h-1zM3 17h1v1h-1zM6 17h1v1h-1zM8 17h1v1h-1zM10 17h2v1h-2zM15 17h1v1h-1zM17 17h1v1h-1zM19 17h1v1h-1zM21 17h1v1h-1zM24 17h2v1h-2zM27 17h2v1h-2zM0 18h1v1h-1zM3 18h1v1h-1zM5 18h1v1h-1zM7 18h1v1h-1zM9 18h1v1h-1zM11 18h1v1h-1zM13 18h1v1h-1zM15 18h2v1h-2zM19 18h3v1h-3zM25 18h1v1h-1zM28 18h1v1h-1zM0 19h1v1h-1zM2 19h1v1h-1zM5 19h1v1h-1zM8 19h1v1h-1zM10 19h1v1h-1zM14 19h2v1h-2zM18 19h3v1h-3zM22 19h1v1h-1zM24 19h1v1h-1zM26 19h3v1h-3zM0 20h1v1h-1zM3 20h2v1h-2zM6 20h2v1h-2zM9 20h2v1h-2zM12 20h4v1h-4zM17 20h1v1h-1zM19 20h2v1h-2zM23 20h1v1h-1zM25 20h2v1h-2zM28 20h1v1h-1zM8 21h1v1h-1zM10 21h1v1h-1zM12 21h1v1h-1zM15 21h1v1h-1zM17 21h3v1h-3zM21 21h2v1h-2zM24 21h3v1h-3zM0 22h7v1h-7zM8 22h2v1h-2zM11 22h3v1h-3zM15 22h1v1h-1zM17 22h2v1h-2zM21 22h1v1h-1zM23 22h2v1h-2zM26 22h1v1h-1zM28 22h1v1h-1zM0 23h1v1h-1zM6 23h1v1h-1zM8 23h2v1h-2zM11 23h1v1h-1zM14 23h1v1h-1zM17 23h1v1h-1zM19 23h1v1h-1zM24 23h1v1h-1zM26 23h1v1h-1zM0 24h1v1h-1zM2 24h3v1h-3zM6 24h1v1h-1zM8 24h1v1h-1zM10 24h3v1h-3zM15 24h1v1h-1zM17 24h1v1h-1zM19 24h5v1h-5zM25 24h4v1h-4zM0 25h1v1h-1zM2 25h3v1h-3zM6 25h1v1h-1zM8 25h3v1h-3zM12 25h2v1h-2zM15 25h1v1h-1zM19 25h2v1h-2zM22 25h1v1h-1zM25 25h1v1h-1zM27 25h1v1h-1zM0 26h1v1h-1zM2 26h3v1h-3zM6 26h1v1h-1zM9 26h3v1h-3zM13 26h3v1h-3zM17 26h2v1h-2zM20 26h1v1h-1zM22 26h3v1h-3zM26 26h2v1h-2zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM10 27h1v1h-1zM12 27h1v1h-1zM14 27h3v1h-3zM18 27h2v1h-2zM21 27h3v1h-3zM25 27h1v1h-1zM28 27h1v1h-1zM0 28h7v1h-7zM9 28h1v1h-1zM11 28h1v1h-1zM13 28h1v1h-1zM15 28h2v1h-2zM18 28h1v1h-1zM20 28h3v1h-3zM24 28h1v1h-1zM26 28h1v1h-1zM28 28h1v1h-1z" fill="black"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Create temporary HTML file
    const tempHtmlPath = path.join(__dirname, '..', 'temp-flyer-a5.html');
    fs.writeFileSync(tempHtmlPath, flyerHTML);
    
    // Navigate to the HTML file
    await page.goto(`file://${tempHtmlPath}`, {
      waitUntil: 'networkidle0'
    });
    
    // Wait a bit for everything to render
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate PDF
    const pdfPath = path.join(__dirname, '..', 'public', 'downloads', 'ellepot-fp12-folder-a5.pdf');
    
    // Create downloads directory if it doesn't exist
    const downloadsDir = path.join(__dirname, '..', 'public', 'downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    
    await page.pdf({
      path: pdfPath,
      format: 'A5',
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    });
    
    console.log(`✅ A5 PDF generated successfully at: ${pdfPath}`);
    
    // Clean up temporary HTML file
    fs.unlinkSync(tempHtmlPath);
    
    // Get file size
    const stats = fs.statSync(pdfPath);
    console.log(`📄 PDF size: ${(stats.size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

// Run the function
generatePDF();