const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

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

// Complete HTML for the A4 flyer with Lumora house style
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
            color: #1a3d1a;
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
            background: linear-gradient(135deg, #fdfbf4 0%, #f9f7e8 100%);
            border-bottom: 3px solid #d4af36;
            padding: 10mm 20mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            height: 20mm;
            width: auto;
        }
        
        .header-text {
            text-align: right;
        }
        
        .header-text h2 {
            font-size: 14pt;
            color: #1a3d1a;
            font-weight: 700;
            margin-bottom: 2mm;
        }
        
        .header-text p {
            font-size: 10pt;
            color: #2d5a2d;
            font-weight: 400;
        }
        
        /* Main content */
        .content {
            flex: 1;
            padding: 15mm 20mm;
            background: white;
            overflow: hidden;
        }
        
        /* Title section */
        .title-section {
            text-align: center;
            margin-bottom: 10mm;
        }
        
        h1 {
            font-size: 24pt;
            color: #1a3d1a;
            margin-bottom: 3mm;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5mm;
        }
        
        .subtitle {
            font-size: 12pt;
            color: #d4af36;
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
            color: #1a3d1a;
            font-weight: 600;
        }
        
        /* Voordelen section */
        .benefits-section {
            margin-bottom: 10mm;
        }
        
        .benefits-title {
            font-size: 16pt;
            color: #1a3d1a;
            text-align: center;
            margin-bottom: 8mm;
            position: relative;
        }
        
        .benefits-title:after {
            content: '';
            display: block;
            width: 60mm;
            height: 2px;
            background: #d4af36;
            margin: 3mm auto 0;
        }
        
        .benefits-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8mm;
            margin-bottom: 10mm;
        }
        
        .benefit {
            background: linear-gradient(135deg, #fdfbf4 0%, #f9f7e8 100%);
            border: 1px solid #e8dfc0;
            border-radius: 8px;
            padding: 8mm;
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
            background: #d4af36;
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
            font-size: 11pt;
            color: #1a3d1a;
            font-weight: 600;
            margin-bottom: 2mm;
        }
        
        .benefit-content p {
            font-size: 9pt;
            line-height: 1.5;
            color: #444;
        }
        
        /* Product showcase */
        .product-showcase {
            margin-bottom: 10mm;
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
            background: #1a3d1a;
            color: white;
            padding: 10mm 20mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-left h3 {
            font-size: 12pt;
            margin-bottom: 3mm;
        }
        
        .contact-info {
            font-size: 9pt;
            line-height: 1.6;
        }
        
        .contact-info p {
            margin-bottom: 2mm;
            display: flex;
            align-items: center;
            gap: 5mm;
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
            width: 60px;
            height: 60px;
        }
        
        /* Decorative elements */
        .watermark {
            position: absolute;
            bottom: 40mm;
            right: -20mm;
            width: 120mm;
            height: 120mm;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" font-family="Arial" font-size="80" fill="%23f9f7e8" text-anchor="middle" opacity="0.5" transform="rotate(-45 50 50)">LUMORA</text></svg>') no-repeat center;
            background-size: contain;
            opacity: 0.05;
            z-index: 0;
        }
        
        /* NIEUW badge */
        .nieuw-badge {
            position: absolute;
            top: 25mm;
            right: 20mm;
            background: #ff0000;
            color: white;
            font-size: 16pt;
            font-weight: bold;
            padding: 8mm 12mm;
            border-radius: 50%;
            transform: rotate(-15deg);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 100;
            text-transform: uppercase;
            letter-spacing: 1mm;
            border: 3px solid #fff;
            background: radial-gradient(ellipse at center, #ff3333 0%, #cc0000 100%);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .nieuw-badge:before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background: radial-gradient(ellipse at center, #ff6666 0%, #ff0000 100%);
            border-radius: 50%;
            z-index: -1;
            opacity: 0.5;
        }
    </style>
</head>
<body>
    <div class="page">
        <!-- NIEUW Badge -->
        <div class="nieuw-badge">NIEUW</div>
        
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
                <h1>Ellepot® FP 12+ Papier</h1>
                <p class="subtitle">De innovatieve verpakking voor onze paperbus steenwol pluggen</p>
                <div class="intro">
                    Al onze <strong>paperbus steenwol pluggen</strong> zijn verpakt met het hoogwaardige 
                    <strong>Ellepot FP 12+ papier</strong>. Deze duurzame verpakkingsoplossing combineert 
                    milieuvriendelijkheid met optimale groeiomstandigheden voor uw gewassen.
                </div>
            </div>
            
            <!-- Voordelen -->
            <div class="benefits-section">
                <h2 class="benefits-title">Voordelen van onze pluggen met FP 12+ papier</h2>
                
                <div class="benefits-grid">
                    <div class="benefit">
                        <div class="benefit-header">
                            <span class="benefit-icon">🌱</span>
                            <div class="benefit-content">
                                <h3>100% Milieuvriendelijk</h3>
                                <p>Vervaardigd uit duurzame houtvezels van gecertificeerde hernieuwbare bronnen. 
                                Het papier is volledig biologisch afbreekbaar en draagt bij aan een circulaire economie.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="benefit">
                        <div class="benefit-header">
                            <span class="benefit-icon">⏰</span>
                            <div class="benefit-content">
                                <h3>12+ Maanden Stabiliteit</h3>
                                <p>Speciaal ontwikkeld voor langdurige teelten. Het papier behoudt zijn structuur 
                                gedurende de hele kweekperiode, waardoor uw planten optimaal kunnen groeien.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="benefit">
                        <div class="benefit-header">
                            <span class="benefit-icon">🛡️</span>
                            <div class="benefit-content">
                                <h3>Schimmelwerende Bescherming</h3>
                                <p>Behandeld met een veilige fungicide coating die jonge planten beschermt tegen 
                                schimmelinfecties. Dit verhoogt de overlevingskans en gezondheid van uw zaailingen.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="benefit">
                        <div class="benefit-header">
                            <span class="benefit-icon">🌿</span>
                            <div class="benefit-content">
                                <h3>Geen Transplantatieschok</h3>
                                <p>De unieke papierstructuur laat wortels moeiteloos doorgroeien. Dit elimineert 
                                transplantatieschok volledig, resulterend in snellere groei en hogere opbrengsten.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Product showcase -->
            <div class="product-showcase">
                <div class="product-images">
                    <div class="product-image-container">
                        <img src="${productImageDataUrl}" alt="Tray-84st Paperbus Steenwol Pluggen" class="product-image">
                        <p class="product-caption">Tray-84st: 84 pluggen per tray</p>
                    </div>
                    <div class="product-image-container">
                        <img src="${productImage2DataUrl}" alt="Tray-104st Paperbus Steenwol Pluggen" class="product-image">
                        <p class="product-caption">Tray-104st: 104 pluggen per tray</p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 15mm; align-items: flex-start; margin-bottom: 10mm;">
                    <div style="flex: 1.2;">
                        <img src="${greenhouseDataUrl}" alt="Professionele glastuinbouw" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                        <p style="font-size: 8pt; color: #666; font-style: italic; text-align: center; margin-top: 3mm;">
                            Toegepast in professionele glastuinbouw
                        </p>
                    </div>
                    <div style="flex: 1;">
                        <div class="product-info">
                            <h3>Superieure Kwaliteit</h3>
                            <p>Onze paperbus steenwol pluggen met Ellepot FP 12+ papier bieden de perfecte 
                            combinatie van stabiliteit, luchtdoorlatendheid en vochtregulatie. Het resultaat: 
                            gezondere planten met een sterker wortelstelsel.</p>
                        </div>
                        
                        <div class="applications">
                            <h3>Ideaal voor:</h3>
                            <div class="applications-list">
                                <div class="application-item">
                                    <span class="checkmark">✓</span>
                                    <span>Groenteteelt</span>
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
            <div class="footer-left">
                <h3>Neem contact op voor meer informatie</h3>
                <div class="contact-info">
                    <p>✉ info@lumorahorticulture.com</p>
                    <p>🌐 www.lumorahorticulture.nl</p>
                    <p>📱 +31 6 38382564</p>
                </div>
            </div>
            <div class="footer-right">
                <p>Scan voor productdetails</p>
                <div class="qr-code">
                    <svg viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
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
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files']
  });
  
  try {
    const page = await browser.newPage();
    
    // Create temporary HTML file
    const tempHtmlPath = path.join(__dirname, '..', 'temp-flyer-a4-pro.html');
    fs.writeFileSync(tempHtmlPath, flyerHTML);
    
    // Set viewport
    await page.setViewport({ width: 1200, height: 1600 });
    
    // Navigate to the HTML file
    await page.goto(`file://${tempHtmlPath}`, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0']
    });
    
    // Wait for images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', reject);
          });
        })
      );
    });
    
    // Extra wait for rendering
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