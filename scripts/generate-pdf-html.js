const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Create standalone HTML for the flyer
const flyerHTML = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ellepot FP 12+ Folder</title>
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            background: white;
            color: #333;
        }
        
        .page {
            width: 210mm;
            height: 297mm;
            position: relative;
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(to right, #1a3a1a, #2d5a2d);
            color: white;
            padding: 25mm 20mm 20mm 20mm;
        }
        
        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 20mm;
        }
        
        .logo-box {
            background: white;
            padding: 5mm;
            border-radius: 8px;
            width: 40mm;
            height: 15mm;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a3a1a;
            font-weight: bold;
            font-size: 14pt;
        }
        
        .header-right {
            text-align: right;
        }
        
        .header-right h3 {
            font-size: 14pt;
            margin-bottom: 2mm;
        }
        
        .header-right p {
            font-size: 10pt;
            opacity: 0.9;
        }
        
        h1 {
            font-size: 28pt;
            margin-bottom: 5mm;
        }
        
        .subtitle {
            font-size: 16pt;
            opacity: 0.95;
        }
        
        .content {
            padding: 15mm 20mm 40mm 20mm;
        }
        
        .intro {
            font-size: 11pt;
            line-height: 1.6;
            margin-bottom: 15mm;
            color: #555;
        }
        
        .features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10mm;
            margin-bottom: 15mm;
        }
        
        .feature {
            background: #f0f4f0;
            border: 1px solid #d0e0d0;
            border-radius: 8px;
            padding: 10mm;
        }
        
        .feature-header {
            display: flex;
            gap: 8mm;
            align-items: start;
        }
        
        .feature-icon {
            font-size: 20pt;
            line-height: 1;
        }
        
        .feature h3 {
            font-size: 12pt;
            margin-bottom: 3mm;
            color: #1a3a1a;
        }
        
        .feature p {
            font-size: 9pt;
            line-height: 1.5;
            color: #666;
        }
        
        .product-image {
            width: 100%;
            max-width: 140mm;
            height: 60mm;
            background: #f5f5f5;
            border-radius: 8px;
            margin: 0 auto 15mm;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            font-size: 10pt;
            color: #999;
        }
        
        .transplant-section {
            background: #f8f8f8;
            border-radius: 8px;
            padding: 10mm;
            margin-bottom: 10mm;
        }
        
        .transplant-section h3 {
            font-size: 12pt;
            margin-bottom: 5mm;
            color: #1a3a1a;
        }
        
        .transplant-section p {
            font-size: 9pt;
            line-height: 1.6;
            color: #555;
        }
        
        .applications h3 {
            font-size: 12pt;
            margin-bottom: 5mm;
            color: #1a3a1a;
        }
        
        .applications-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3mm 10mm;
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
        }
        
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1a3a1a;
            color: white;
            padding: 15mm 20mm;
            display: flex;
            justify-content: space-between;
            align-items: end;
        }
        
        .footer h3 {
            font-size: 14pt;
            margin-bottom: 5mm;
        }
        
        .contact-info {
            font-size: 9pt;
            line-height: 1.8;
        }
        
        .contact-info p {
            margin-bottom: 2mm;
        }
        
        .qr-section {
            text-align: center;
        }
        
        .qr-section p {
            font-size: 8pt;
            margin-bottom: 3mm;
            opacity: 0.8;
        }
        
        .qr-code {
            width: 25mm;
            height: 25mm;
            background: white;
            padding: 3mm;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8pt;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="header-top">
                <div class="logo-box">
                    LUMORA
                </div>
                <div class="header-right">
                    <h3>Milieuvriendelijk</h3>
                    <p>Duurzame kweekoplossing</p>
                </div>
            </div>
            <h1>Ellepot® FP 12+ Papier</h1>
            <p class="subtitle">Het innovatieve omhulsel voor onze steenwolpluggen</p>
        </div>
        
        <div class="content">
            <div class="intro">
                Al onze <strong>paperbus steenwol pluggen</strong> zijn verpakt met <strong>Ellepot FP 12+ papier</strong> – een duurzame en 
                innovatieve oplossing voor het kweken van sterke en gezonde planten. Dit speciale papier is gemaakt 
                van milieuvriendelijke houtvezels uit hernieuwbare bronnen, met een toevoeging van polyester voor 
                versterking.
            </div>
            
            <div class="features">
                <div class="feature">
                    <div class="feature-header">
                        <div class="feature-icon">🌱</div>
                        <div>
                            <h3>Milieuvriendelijk</h3>
                            <p>Gemaakt van houtvezels uit hernieuwbare bronnen met minimale impact op het milieu</p>
                        </div>
                    </div>
                </div>
                
                <div class="feature">
                    <div class="feature-header">
                        <div class="feature-icon">⏰</div>
                        <div>
                            <h3>12+ Maanden Afbraaktijd</h3>
                            <p>Perfect voor gewassen met een langere productietijd voordat ze uitgeplant worden</p>
                        </div>
                    </div>
                </div>
                
                <div class="feature">
                    <div class="feature-header">
                        <div class="feature-icon">🛡️</div>
                        <div>
                            <h3>Schimmelwerend</h3>
                            <p>Voorzien van fungicide eigenschappen om jonge planten extra te beschermen</p>
                        </div>
                    </div>
                </div>
                
                <div class="feature">
                    <div class="feature-header">
                        <div class="feature-icon">🌿</div>
                        <div>
                            <h3>Geen Transplantatieschok</h3>
                            <p>Wortels groeien moeiteloos door het papier heen zonder groeistilstand</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="product-image">
                [Product Afbeelding]
            </div>
            
            <div class="transplant-section">
                <h3>Wat is transplantatieschok?</h3>
                <p>
                    Bij het verplanten van jonge planten raken wortels vaak beschadigd. Hierdoor stopt de plant 
                    tijdelijk met groeien of ziet hij er slap uit. Met onze paperbus steenwol pluggen in Ellepot FP 12+ 
                    papier gebeurt dit niet: de wortels groeien moeiteloos door het papier heen, zodat je planten 
                    sterk en gezond verder groeien.
                </p>
            </div>
            
            <div class="applications">
                <h3>Perfect geschikt voor:</h3>
                <div class="applications-grid">
                    <div class="application-item">
                        <span class="checkmark">✓</span>
                        <span>Groente- en kruidenkwekerijen</span>
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
                        <span>Hobby- en moestuiniers</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div>
                <h3>Neem contact met ons op</h3>
                <div class="contact-info">
                    <p>✉ info@lumorahorticulture.com</p>
                    <p>🌐 lumorahorticulture.nl</p>
                    <p>📱 +31 6 38382564</p>
                </div>
            </div>
            
            <div class="qr-section">
                <p>Scan voor meer info</p>
                <div class="qr-code">
                    [QR Code]
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

async function generatePDF() {
  // First save the HTML file
  const htmlPath = path.join(__dirname, '..', 'public', 'downloads', 'ellepot-flyer.html');
  fs.writeFileSync(htmlPath, flyerHTML);
  console.log('HTML file created');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Load the HTML file
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    const pdfPath = path.join(__dirname, '..', 'public', 'downloads', 'ellepot-fp12-folder.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    });
    
    console.log(`PDF generated successfully at: ${pdfPath}`);
    
    // Clean up HTML file
    fs.unlinkSync(htmlPath);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

// Run the function
generatePDF();