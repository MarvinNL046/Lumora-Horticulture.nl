const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Read the logo as base64
    const logoPath = path.join(__dirname, '..', 'public', 'logo', 'lumura-horticulture-logo.jpeg');
    const logoBase64 = fs.readFileSync(logoPath, 'base64');
    const logoDataUrl = `data:image/jpeg;base64,${logoBase64}`;

    // Read product images as base64
    const productImagePath = path.join(__dirname, '..', 'public', 'productAfbeeldingen', 'trays', 'tray84', 'lumorahorticulture-tray84.jpg');
    const productImageBase64 = fs.readFileSync(productImagePath, 'base64');
    const productImageDataUrl = `data:image/jpeg;base64,${productImageBase64}`;

    const productImage2Path = path.join(__dirname, '..', 'public', 'productAfbeeldingen', 'trays', 'tray104', 'lumorahorticulture-tray104.jpg');
    const productImage2Base64 = fs.readFileSync(productImage2Path, 'base64');
    const productImage2DataUrl = `data:image/jpeg;base64,${productImage2Base64}`;

    const greenhousePath = path.join(__dirname, '..', 'public', 'images', 'greenhouse-1.jpg');
    const greenhouseBase64 = fs.readFileSync(greenhousePath, 'base64');
    const greenhouseDataUrl = `data:image/jpeg;base64,${greenhouseBase64}`;
    
    // Generate QR code for website
    const qrCodeDataUrl = await QRCode.toDataURL('https://lumorahorticulture.nl', {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    
    // Generate HTML with embedded images
    const flyerHTML = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ellepot FP 12+ - Lumora Horticulture</title>
    <style>
        @page {
            size: A4;
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
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            background: white;
            color: #404F4A;
        }
        
        .page {
            width: 210mm;
            height: 297mm;
            position: relative;
            overflow: hidden;
            background: white;
            display: flex;
            flex-direction: column;
        }
        
        /* Header met Lumora huisstijl */
        .header {
            background: #53605C;
            border-bottom: 3px solid #D4AF37;
            padding: 5mm 20mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            height: 15mm;
            width: auto;
        }
        
        .header-text {
            text-align: right;
        }
        
        .header-text h2 {
            font-size: 12pt;
            color: white;
            font-weight: 700;
            margin-bottom: 1mm;
        }
        
        .header-text p {
            font-size: 9pt;
            color: white;
            font-weight: 400;
        }
        
        /* Main content */
        .content {
            flex: 1;
            padding: 10mm 20mm;
            background: white;
            overflow: hidden;
        }
        
        /* Title section */
        .title-section {
            text-align: center;
            margin-bottom: 8mm;
        }
        
        h1 {
            font-size: 24pt;
            color: #404F4A;
            margin-bottom: 3mm;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5mm;
        }
        
        .subtitle {
            font-size: 12pt;
            color: #D4AF37;
            font-weight: 500;
            margin-bottom: 5mm;
        }
        
        .intro {
            font-size: 10pt;
            line-height: 1.6;
            color: #333;
            max-width: 160mm;
            margin: 0 auto;
            text-align: center;
        }
        
        .intro strong {
            color: #2D7D46;
            font-weight: 600;
        }
        
        /* Voordelen section */
        .benefits-section {
            margin-bottom: 8mm;
        }
        
        .benefits-title {
            font-size: 16pt;
            color: #404F4A;
            text-align: center;
            margin-bottom: 8mm;
            position: relative;
        }
        
        .benefits-title:after {
            content: '';
            display: block;
            width: 60mm;
            height: 2px;
            background: #D4AF37;
            margin: 3mm auto 0;
        }
        
        .benefits-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6mm;
            margin-bottom: 8mm;
        }
        
        .benefit {
            background: #FCF8D8;
            border: 1px solid #D4AF37;
            border-radius: 8px;
            padding: 6mm;
            position: relative;
            overflow: hidden;
        }
        
        .benefit:before {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            right: -1px;
            height: 3px;
            background: #D4AF37;
        }
        
        .benefit-header {
            display: flex;
            align-items: flex-start;
            gap: 5mm;
            margin-bottom: 5mm;
        }
        
        .benefit-icon {
            font-size: 20pt;
            line-height: 1;
            flex-shrink: 0;
        }
        
        .benefit-content h3 {
            font-size: 10pt;
            color: #404F4A;
            font-weight: 600;
            margin-bottom: 2mm;
        }
        
        .benefit-content p {
            font-size: 8pt;
            line-height: 1.4;
            color: #444;
        }
        
        /* Product showcase */
        .product-showcase {
            margin-bottom: 8mm;
        }
        
        .product-images {
            display: flex;
            gap: 10mm;
            margin-bottom: 8mm;
        }
        
        .product-image-container {
            flex: 1;
            text-align: center;
        }
        
        .product-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 3mm;
        }
        
        .product-caption {
            font-size: 8pt;
            color: #666;
            font-style: italic;
        }
        
        .product-info {
            margin-bottom: 8mm;
        }
        
        .product-info h3 {
            font-size: 14pt;
            color: #1a3d1a;
            margin-bottom: 5mm;
        }
        
        .product-info p {
            font-size: 10pt;
            line-height: 1.6;
            color: #444;
            margin-bottom: 5mm;
        }
        
        /* Applications */
        .applications {
            background: #fdfbf4;
            border-radius: 8px;
            padding: 8mm;
            text-align: center;
        }
        
        .applications h3 {
            font-size: 12pt;
            color: #1a3d1a;
            margin-bottom: 5mm;
        }
        
        .applications-list {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 8mm;
        }
        
        .application-item {
            display: flex;
            align-items: center;
            gap: 3mm;
            font-size: 10pt;
            color: #333;
        }
        
        .checkmark {
            color: #d4af36;
            font-size: 12pt;
            font-weight: bold;
        }
        
        /* Footer */
        .footer {
            background: #262E30;
            color: white;
            padding: 5mm 20mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-left h3 {
            font-size: 11pt;
            margin-bottom: 2mm;
        }
        
        .contact-info {
            font-size: 8pt;
            line-height: 1.5;
        }
        
        .contact-info p {
            margin-bottom: 1mm;
            display: flex;
            align-items: center;
            gap: 3mm;
        }
        
        .footer-right {
            text-align: center;
        }
        
        .footer-right p {
            font-size: 8pt;
            margin-bottom: 3mm;
            opacity: 0.9;
        }
        
        .qr-code {
            background: white;
            padding: 5px;
            border-radius: 5px;
            display: inline-block;
        }
        
        .qr-code svg {
            width: 50px;
            height: 50px;
        }
        
        /* Decorative elements */
        .watermark {
            position: absolute;
            bottom: 40mm;
            right: -20mm;
            width: 120mm;
            height: 120mm;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" font-family="Arial" font-size="40" fill="%23f9f7e8" text-anchor="middle" opacity="0.5" transform="rotate(-45 50 50)">LUMORA QUALITY</text></svg>') no-repeat center;
            background-size: contain;
            opacity: 0.05;
            z-index: 0;
        }
    </style>
</head>
<body>
    <div class="page">
        <!-- Header -->
        <div class="header">
            <img src="${logoDataUrl}" alt="Lumora Horticulture" class="logo">
            <div class="header-text">
                <h2>Professionele Kweekoplossingen</h2>
                <p>Duurzaam • Innovatief • Betrouwbaar</p>
            </div>
        </div>
        
        <!-- Main content -->
        <div class="content">
            <!-- Title -->
            <div class="title-section">
                <h1>Lumora Paperbus Steenwol Pluggen</h1>
                <p class="subtitle" style="color: #D5B23F; font-weight: bold;">Superieure kwaliteit dankzij FP 12+ technologie</p>
                <div class="intro">
                    Bij <strong>Lumora Horticulture</strong> kiezen we bewust voor het beste: al onze 
                    <strong>paperbus steenwol pluggen</strong> zijn verpakt met het innovatieve 
                    <strong>FP 12+ vlies</strong>. Dit maakt onze pluggen superieur in kwaliteit,
                    met unieke schimmelwerende eigenschappen voor optimale groeiresultaten.
                </div>
            </div>
            
            <!-- Voordelen -->
            <div class="benefits-section">
                <h2 class="benefits-title">Waarom kiezen voor Lumora pluggen?</h2>
                
                <div class="benefits-grid">
                    <div class="benefit">
                        <div class="benefit-header">
                            <span class="benefit-icon">🌱</span>
                            <div class="benefit-content">
                                <h3>100% Milieuvriendelijk</h3>
                                <p>Lumora kiest bewust voor duurzaamheid. Het FP 12+ vlies is vervaardigd uit 
                                gecertificeerde hernieuwbare houtvezels, volledig biologisch afbreekbaar en 
                                draagt bij aan onze missie voor een groene toekomst.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="benefit">
                        <div class="benefit-header">
                            <span class="benefit-icon">⏰</span>
                            <div class="benefit-content">
                                <h3>12+ Maanden Stabiliteit</h3>
                                <p>Lumora pluggen met FP 12+ technologie behouden hun structuur gedurende de hele 
                                kweekperiode. Deze langdurige stabiliteit is cruciaal voor professionele teelten 
                                en onderscheidt ons van goedkopere alternatieven.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="benefit">
                        <div class="benefit-header">
                            <span class="benefit-icon">🛡️</span>
                            <div class="benefit-content">
                                <h3>Unieke Schimmelwerende Bescherming</h3>
                                <p>Het FP 12+ vlies dat wij gebruiken heeft een gepatenteerde fungicide coating die 
                                jonge planten beschermt tegen schimmelinfecties. Dit onderscheidt Lumora pluggen 
                                van standaard alternatieven.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="benefit">
                        <div class="benefit-header">
                            <span class="benefit-icon">🌿</span>
                            <div class="benefit-content">
                                <h3>Geen Transplantatieschok</h3>
                                <p>Lumora's gebruik van FP 12+ vlies garandeert dat wortels moeiteloos doorgroeien. 
                                Geen transplantatieschok betekent gezondere planten, snellere groei en uiteindelijk 
                                hogere opbrengsten voor uw bedrijf.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Product showcase -->
            <div class="product-showcase">
                <div style="display: flex; gap: 15mm; margin-bottom: 10mm; align-items: flex-start;">
                    <div style="flex: 1; text-align: center;">
                        <img src="${productImageDataUrl}" alt="Lumora Paperbus Steenwol Pluggen" style="width: auto; height: 45mm; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                        <p style="font-size: 9pt; color: #666; font-style: italic; margin-top: 3mm;">
                            Beschikbaar in:<br>
                            Tray-84st (84 pluggen) &amp; Tray-104st (104 pluggen)
                        </p>
                    </div>
                    <div style="flex: 1; text-align: center; margin-top: 0;">
                        <p style="font-size: 10pt; color: #404F4A; font-weight: 600; margin-bottom: 5mm;">Bezoek onze website</p>
                        <div style="background: white; padding: 10px; border: 2px solid #D4AF37; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                            <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 100px; height: 100px; display: block;">
                        </div>
                        <p style="font-size: 9pt; color: #666; margin-top: 3mm;">
                            www.lumorahorticulture.nl
                        </p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10mm;">
                    <div style="flex: 1;">
                        <div class="product-info" style="margin-bottom: 5mm;">
                            <h3 style="font-size: 12pt; margin-bottom: 3mm; color: #404F4A;">De Lumora Kwaliteitsgarantie</h3>
                            <p style="font-size: 9pt; line-height: 1.5; margin-bottom: 3mm;">Door onze keuze voor het premium Ellepot FP 12+ vlies garanderen wij superieure 
                            pluggen met perfecte stabiliteit, luchtdoorlatendheid en vochtregulatie.</p>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="applications" style="padding: 5mm;">
                            <h3 style="font-size: 11pt; margin-bottom: 3mm; color: #404F4A;">Ideaal voor:</h3>
                            <div class="applications-list" style="gap: 5mm;">
                                <div class="application-item" style="font-size: 9pt;">
                                    <span class="checkmark" style="font-size: 10pt;">✓</span>
                                    <span>Groenteteelt</span>
                                </div>
                                <div class="application-item" style="font-size: 9pt;">
                                    <span class="checkmark" style="font-size: 10pt; color: #2D7D46;">✓</span>
                                    <span>Sierteelt</span>
                                </div>
                                <div class="application-item" style="font-size: 9pt;">
                                    <span class="checkmark" style="font-size: 10pt; color: #2D7D46;">✓</span>
                                    <span>Boomkwekerijen</span>
                                </div>
                                <div class="application-item" style="font-size: 9pt;">
                                    <span class="checkmark" style="font-size: 10pt; color: #2D7D46;">✓</span>
                                    <span>Kruidenteelt</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Watermark -->
        <div class="watermark"></div>
        
        <!-- Footer -->
        <div class="footer">
            <div style="flex: 1; text-align: center;">
                <span style="font-size: 9pt;">✉ info@lumorahorticulture.com</span>
            </div>
            <div style="flex: 1; text-align: center;">
                <span style="font-size: 9pt;">🌐 www.lumorahorticulture.nl</span>
            </div>
            <div style="flex: 1; text-align: center;">
                <span style="font-size: 9pt;">📱 +31 6 38382564</span>
            </div>
        </div>
    </div>
</body>
</html>
`;
    
    // Create temporary HTML file
    const tempHtmlPath = path.join(__dirname, '..', 'temp-flyer-a4-fixed.html');
    fs.writeFileSync(tempHtmlPath, flyerHTML);
    
    // Navigate to the HTML file
    await page.goto(`file://${tempHtmlPath}`, {
      waitUntil: 'networkidle0'
    });
    
    // Wait a bit for everything to render
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate PDF
    const pdfPath = path.join(__dirname, '..', 'public', 'downloads', 'ellepot-fp12-folder.pdf');
    
    // Create downloads directory if it doesn't exist
    const downloadsDir = path.join(__dirname, '..', 'public', 'downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    
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
    
    console.log(`✅ Professional A4 PDF generated successfully at: ${pdfPath}`);
    
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