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

// Complete HTML for the flyer with embedded images
const flyerHTML = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ellepot FP 12+ Folder - Lumora Horticulture</title>
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
            background: white;
            page-break-after: always;
        }
        
        .page:last-child {
            page-break-after: auto;
        }
        
        /* Page 1 Header Section */
        .header {
            background: linear-gradient(135deg, #1a3d1a 0%, #2d5a2d 50%, #3a6a3a 100%);
            color: white;
            padding: 40mm 30mm;
            position: relative;
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 60%;
            height: 200%;
            background: rgba(255, 255, 255, 0.05);
            transform: rotate(35deg);
        }
        
        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15mm;
            position: relative;
            z-index: 1;
        }
        
        .logo-box {
            background: white;
            padding: 8px 12px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .logo {
            height: 40px;
            width: auto;
        }
        
        .header-right {
            text-align: right;
        }
        
        .header-right h3 {
            font-size: 16pt;
            font-weight: 600;
            margin-bottom: 2mm;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .header-right p {
            font-size: 12pt;
            opacity: 0.9;
        }
        
        h1 {
            font-size: 36pt;
            font-weight: 700;
            margin-bottom: 5mm;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            letter-spacing: -0.5mm;
            position: relative;
            z-index: 1;
        }
        
        .subtitle {
            font-size: 18pt;
            font-weight: 300;
            opacity: 0.95;
            position: relative;
            z-index: 1;
        }
        
        /* Content Section */
        .content {
            padding: 20mm 20mm 15mm 20mm;
        }
        
        .intro {
            font-size: 12pt;
            line-height: 1.7;
            margin-bottom: 15mm;
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
            gap: 10mm;
            margin-bottom: 15mm;
        }
        
        .feature {
            background: linear-gradient(135deg, #f8fdf8 0%, #f2f9f2 100%);
            border: 1px solid #d4e4d4;
            border-radius: 12px;
            padding: 12mm;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .feature::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #2d5a2d, #3a6a3a);
            border-radius: 12px;
            opacity: 0;
            z-index: -1;
        }
        
        .feature-header {
            display: flex;
            gap: 10mm;
            align-items: flex-start;
        }
        
        .feature-icon {
            font-size: 28pt;
            line-height: 1;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .feature h3 {
            font-size: 14pt;
            font-weight: 600;
            margin-bottom: 3mm;
            color: #1a3d1a;
        }
        
        .feature p {
            font-size: 10pt;
            line-height: 1.5;
            color: #666;
        }
        
        /* Product Image */
        .product-section {
            text-align: center;
            margin-bottom: 15mm;
        }
        
        .product-image-container {
            display: inline-block;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            background: white;
            padding: 5px;
        }
        
        .product-image {
            width: 140mm;
            height: auto;
            display: block;
            border-radius: 12px;
        }
        
        .product-caption {
            font-size: 10pt;
            color: #666;
            margin-top: 5mm;
            font-style: italic;
        }
        
        /* Transplant Section */
        .transplant-section {
            background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
            border-radius: 16px;
            padding: 12mm;
            margin-bottom: 12mm;
            border: 1px solid #e0e0e0;
        }
        
        .transplant-section h3 {
            font-size: 14pt;
            font-weight: 600;
            margin-bottom: 5mm;
            color: #1a3d1a;
        }
        
        .transplant-section p {
            font-size: 11pt;
            line-height: 1.6;
            color: #555;
        }
        
        /* Applications */
        .applications {
            margin-bottom: 10mm;
        }
        
        .applications h3 {
            font-size: 14pt;
            font-weight: 600;
            margin-bottom: 8mm;
            color: #1a3d1a;
        }
        
        .applications-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5mm 15mm;
        }
        
        .application-item {
            display: flex;
            align-items: center;
            gap: 5mm;
            font-size: 11pt;
        }
        
        .checkmark {
            color: #2d5a2d;
            font-size: 16pt;
            font-weight: bold;
        }
        
        /* Footer */
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1a3d1a 0%, #0d2d0d 100%);
            color: white;
            padding: 15mm 20mm;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        
        .footer h3 {
            font-size: 16pt;
            font-weight: 600;
            margin-bottom: 5mm;
        }
        
        .contact-info {
            font-size: 11pt;
            line-height: 1.8;
        }
        
        .contact-info p {
            margin-bottom: 2mm;
            display: flex;
            align-items: center;
            gap: 5mm;
        }
        
        .qr-section {
            text-align: center;
        }
        
        .qr-section p {
            font-size: 9pt;
            margin-bottom: 3mm;
            opacity: 0.9;
        }
        
        .qr-code {
            background: white;
            padding: 8px;
            border-radius: 8px;
            display: inline-block;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .qr-code svg {
            display: block;
        }
    </style>
</head>
<body>
    <!-- Page 1: Cover Page -->
    <div class="page">
        <div class="header">
            <div>
                <div class="logo-box">
                    <img src="${logoDataUrl}" alt="Lumora Horticulture" class="logo">
                </div>
            </div>
            
            <div style="text-align: center;">
                <h1 style="font-size: 48pt; margin-bottom: 10mm; text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);">
                    Ellepot® FP 12+ Papier
                </h1>
                <p style="font-size: 24pt; font-weight: 300; margin-bottom: 15mm; opacity: 0.95;">
                    Het innovatieve omhulsel voor onze paperbus steenwol pluggen
                </p>
                <div style="display: inline-block; background: white; color: #1a3d1a; padding: 8mm 20mm; border-radius: 50px; font-size: 18pt; font-weight: 600; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);">
                    Milieuvriendelijk • Duurzaam • Effectief
                </div>
            </div>
            
            <div style="text-align: center;">
                <p style="font-size: 14pt; opacity: 0.8;">Lumora Horticulture</p>
                <p style="font-size: 12pt; opacity: 0.7;">Professionele kweekoplossingen</p>
            </div>
        </div>
    </div>
    
    <!-- Page 2: Introduction and Features -->
    <div class="page">
        <div class="content" style="padding: 35mm 30mm;">
            <h2 style="font-size: 36pt; color: #1a3d1a; margin-bottom: 20mm; text-align: center;">
                Waarom kiezen voor Ellepot FP 12+?
            </h2>
            
            <div class="intro" style="font-size: 14pt; line-height: 1.8; margin-bottom: 30mm; text-align: center; max-width: 150mm; margin-left: auto; margin-right: auto;">
                Al onze <strong style="color: #1a3d1a;">paperbus steenwol pluggen</strong> zijn verpakt met <strong style="color: #1a3d1a;">Ellepot FP 12+ papier</strong> – een duurzame en 
                innovatieve oplossing voor het kweken van sterke en gezonde planten. Dit speciale papier is gemaakt 
                van milieuvriendelijke houtvezels uit hernieuwbare bronnen, met een toevoeging van polyester voor 
                versterking.
            </div>
            
            <div class="features" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20mm;">
                <div class="feature" style="background: linear-gradient(135deg, #f8fdf8 0%, #f2f9f2 100%); border: 2px solid #d4e4d4; border-radius: 16px; padding: 20mm; text-align: center;">
                    <div class="feature-icon" style="font-size: 48pt; margin-bottom: 10mm;">🌱</div>
                    <h3 style="font-size: 20pt; font-weight: 600; margin-bottom: 8mm; color: #1a3d1a;">Milieuvriendelijk</h3>
                    <p style="font-size: 12pt; line-height: 1.6; color: #666;">Gemaakt van houtvezels uit hernieuwbare bronnen met minimale impact op het milieu</p>
                </div>
                
                <div class="feature" style="background: linear-gradient(135deg, #f8fdf8 0%, #f2f9f2 100%); border: 2px solid #d4e4d4; border-radius: 16px; padding: 20mm; text-align: center;">
                    <div class="feature-icon" style="font-size: 48pt; margin-bottom: 10mm;">⏰</div>
                    <h3 style="font-size: 20pt; font-weight: 600; margin-bottom: 8mm; color: #1a3d1a;">12+ Maanden Afbraaktijd</h3>
                    <p style="font-size: 12pt; line-height: 1.6; color: #666;">Perfect voor gewassen met een langere productietijd voordat ze uitgeplant worden</p>
                </div>
                
                <div class="feature" style="background: linear-gradient(135deg, #f8fdf8 0%, #f2f9f2 100%); border: 2px solid #d4e4d4; border-radius: 16px; padding: 20mm; text-align: center;">
                    <div class="feature-icon" style="font-size: 48pt; margin-bottom: 10mm;">🛡️</div>
                    <h3 style="font-size: 20pt; font-weight: 600; margin-bottom: 8mm; color: #1a3d1a;">Schimmelwerend</h3>
                    <p style="font-size: 12pt; line-height: 1.6; color: #666;">Voorzien van fungicide eigenschappen om jonge planten extra te beschermen</p>
                </div>
                
                <div class="feature" style="background: linear-gradient(135deg, #f8fdf8 0%, #f2f9f2 100%); border: 2px solid #d4e4d4; border-radius: 16px; padding: 20mm; text-align: center;">
                    <div class="feature-icon" style="font-size: 48pt; margin-bottom: 10mm;">🌿</div>
                    <h3 style="font-size: 20pt; font-weight: 600; margin-bottom: 8mm; color: #1a3d1a;">Geen Transplantatieschok</h3>
                    <p style="font-size: 12pt; line-height: 1.6; color: #666;">Wortels groeien moeiteloos door het papier heen zonder groeistilstand</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Page 3: Product Image and Transplant Info -->
    <div class="page">
        <div class="content" style="padding: 35mm 30mm;">
            <div class="product-section" style="text-align: center; margin-bottom: 30mm;">
                <div class="product-image-container" style="display: inline-block; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15); background: white; padding: 8px;">
                    <img src="${productImageDataUrl}" alt="Ellepot FP 12+ Steenwolpluggen" style="width: 150mm; height: auto; display: block; border-radius: 16px;">
                </div>
                <p style="font-size: 12pt; color: #666; margin-top: 10mm; font-style: italic;">
                    Lumora paperbus steenwol pluggen met Ellepot FP 12+ papier
                </p>
            </div>
            
            <div class="transplant-section" style="background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%); border-radius: 20px; padding: 25mm; border: 2px solid #e0e0e0;">
                <h3 style="font-size: 24pt; font-weight: 600; margin-bottom: 15mm; color: #1a3d1a; text-align: center;">
                    Wat is transplantatieschok?
                </h3>
                <p style="font-size: 14pt; line-height: 1.8; color: #555; text-align: center;">
                    Bij het verplanten van jonge planten raken wortels vaak beschadigd. Hierdoor stopt de plant 
                    tijdelijk met groeien of ziet hij er slap uit. Met onze paperbus steenwol pluggen in Ellepot FP 12+ 
                    papier gebeurt dit niet: de wortels groeien moeiteloos door het papier heen, zodat je planten 
                    sterk en gezond verder groeien.
                </p>
            </div>
        </div>
    </div>
    
    <!-- Page 4: Applications and Contact -->
    <div class="page">
        <div class="content" style="padding: 35mm 30mm 0 30mm;">
            <div class="applications" style="margin-bottom: 40mm;">
                <h3 style="font-size: 28pt; font-weight: 600; margin-bottom: 20mm; color: #1a3d1a; text-align: center;">
                    Perfect geschikt voor:
                </h3>
                <div class="applications-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15mm 25mm; max-width: 140mm; margin: 0 auto;">
                    <div class="application-item" style="display: flex; align-items: center; gap: 10mm; background: #f8fdf8; padding: 10mm 15mm; border-radius: 12px; border: 1px solid #d4e4d4;">
                        <span class="checkmark" style="color: #2d5a2d; font-size: 24pt; font-weight: bold;">✓</span>
                        <span style="font-size: 14pt;">Groente- en kruidenkwekerijen</span>
                    </div>
                    <div class="application-item" style="display: flex; align-items: center; gap: 10mm; background: #f8fdf8; padding: 10mm 15mm; border-radius: 12px; border: 1px solid #d4e4d4;">
                        <span class="checkmark" style="color: #2d5a2d; font-size: 24pt; font-weight: bold;">✓</span>
                        <span style="font-size: 14pt;">Sierteelt</span>
                    </div>
                    <div class="application-item" style="display: flex; align-items: center; gap: 10mm; background: #f8fdf8; padding: 10mm 15mm; border-radius: 12px; border: 1px solid #d4e4d4;">
                        <span class="checkmark" style="color: #2d5a2d; font-size: 24pt; font-weight: bold;">✓</span>
                        <span style="font-size: 14pt;">Boomkwekerijen</span>
                    </div>
                    <div class="application-item" style="display: flex; align-items: center; gap: 10mm; background: #f8fdf8; padding: 10mm 15mm; border-radius: 12px; border: 1px solid #d4e4d4;">
                        <span class="checkmark" style="color: #2d5a2d; font-size: 24pt; font-weight: bold;">✓</span>
                        <span style="font-size: 14pt;">Hobby- en moestuiniers</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer" style="position: absolute; bottom: 0; left: 0; right: 0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h3 style="font-size: 20pt;">Neem contact met ons op</h3>
                    <div class="contact-info" style="font-size: 14pt; line-height: 2.2;">
                        <p style="margin: 0 0 4mm 0;">✉ info@lumorahorticulture.com</p>
                        <p style="margin: 0 0 4mm 0;">🌐 lumorahorticulture.nl</p>
                        <p style="margin: 0;">📱 +31 6 38382564</p>
                    </div>
                </div>
                
                <div class="qr-section" style="text-align: center;">
                    <p style="font-size: 12pt; margin-bottom: 6mm; opacity: 0.8;">Scan voor meer info</p>
                    <div class="qr-code">
                        <svg width="100" height="100" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
                            <!-- QR Code for https://lumorahorticulture.nl/producten/ellepot-fp12 -->
                            <rect width="29" height="29" fill="white"/>
                            <path d="M0 0h7v1h-7zM8 0h1v1h-1zM11 0h2v1h-2zM14 0h1v1h-1zM16 0h2v1h-2zM19 0h1v1h-1zM22 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM10 1h1v1h-1zM12 1h3v1h-3zM16 1h2v1h-2zM19 1h1v1h-1zM22 1h1v1h-1zM28 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h2v1h-2zM11 2h1v1h-1zM14 2h1v1h-1zM16 2h1v1h-1zM18 2h3v1h-3zM22 2h1v1h-1zM24 2h3v1h-3zM28 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM9 3h2v1h-2zM12 3h2v1h-2zM16 3h5v1h-5zM22 3h1v1h-1zM24 3h3v1h-3zM28 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h1v1h-1zM10 4h4v1h-4zM15 4h1v1h-1zM17 4h1v1h-1zM19 4h2v1h-2zM22 4h1v1h-1zM24 4h3v1h-3zM28 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM9 5h1v1h-1zM11 5h1v1h-1zM13 5h2v1h-2zM16 5h2v1h-2zM19 5h1v1h-1zM22 5h1v1h-1zM28 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h7v1h-7zM9 7h2v1h-2zM13 7h1v1h-1zM15 7h1v1h-1zM18 7h1v1h-1zM20 7h1v1h-1zM0 8h1v1h-1zM2 8h2v1h-2zM5 8h2v1h-2zM8 8h1v1h-1zM10 8h1v1h-1zM13 8h1v1h-1zM18 8h1v1h-1zM20 8h2v1h-2zM24 8h1v1h-1zM26 8h2v1h-2zM0 9h1v1h-1zM3 9h1v1h-1zM5 9h2v1h-2zM8 9h1v1h-1zM11 9h3v1h-3zM15 9h4v1h-4zM20 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM26 9h1v1h-1zM28 9h1v1h-1zM1 10h2v1h-2zM4 10h1v1h-1zM7 10h3v1h-3zM12 10h2v1h-2zM15 10h1v1h-1zM17 10h1v1h-1zM19 10h1v1h-1zM22 10h3v1h-3zM26 10h2v1h-2zM1 11h1v1h-1zM5 11h2v1h-2zM8 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM15 11h3v1h-3zM20 11h1v1h-1zM24 11h1v1h-1zM26 11h1v1h-1zM28 11h1v1h-1zM0 12h2v1h-2zM3 12h1v1h-1zM5 12h1v1h-1zM7 12h2v1h-2zM10 12h4v1h-4zM16 12h5v1h-5zM22 12h1v1h-1zM24 12h3v1h-3zM0 13h3v1h-3zM6 13h1v1h-1zM10 13h2v1h-2zM13 13h1v1h-1zM16 13h1v1h-1zM18 13h1v1h-1zM22 13h1v1h-1zM24 13h2v1h-2zM27 13h2v1h-2zM2 14h4v1h-4zM7 14h1v1h-1zM9 14h4v1h-4zM14 14h1v1h-1zM16 14h2v1h-2zM19 14h2v1h-2zM22 14h2v1h-2zM25 14h3v1h-3zM1 15h3v1h-3zM5 15h2v1h-2zM8 15h2v1h-2zM11 15h1v1h-1zM13 15h1v1h-1zM16 15h1v1h-1zM20 15h1v1h-1zM22 15h1v1h-1zM25 15h1v1h-1zM0 16h3v1h-3zM4 16h2v1h-2zM7 16h3v1h-3zM11 16h1v1h-1zM13 16h3v1h-3zM17 16h1v1h-1zM20 16h1v1h-1zM22 16h2v1h-2zM26 16h3v1h-3zM1 17h1v1h-1zM3 17h1v1h-1zM6 17h1v1h-1zM8 17h1v1h-1zM10 17h2v1h-2zM15 17h1v1h-1zM17 17h1v1h-1zM19 17h1v1h-1zM21 17h1v1h-1zM24 17h2v1h-2zM27 17h2v1h-2zM0 18h1v1h-1zM3 18h1v1h-1zM5 18h1v1h-1zM7 18h1v1h-1zM9 18h1v1h-1zM11 18h1v1h-1zM13 18h1v1h-1zM15 18h2v1h-2zM19 18h3v1h-3zM25 18h1v1h-1zM28 18h1v1h-1zM0 19h1v1h-1zM2 19h1v1h-1zM5 19h1v1h-1zM8 19h1v1h-1zM10 19h1v1h-1zM14 19h2v1h-2zM18 19h3v1h-3zM22 19h1v1h-1zM24 19h1v1h-1zM26 19h3v1h-3zM0 20h1v1h-1zM3 20h2v1h-2zM6 20h2v1h-2zM9 20h2v1h-2zM12 20h4v1h-4zM17 20h1v1h-1zM19 20h2v1h-2zM23 20h1v1h-1zM25 20h2v1h-2zM28 20h1v1h-1zM8 21h1v1h-1zM10 21h1v1h-1zM12 21h1v1h-1zM15 21h1v1h-1zM17 21h3v1h-3zM21 21h2v1h-2zM24 21h3v1h-3zM0 22h7v1h-7zM8 22h2v1h-2zM11 22h3v1h-3zM15 22h1v1h-1zM17 22h2v1h-2zM21 22h1v1h-1zM23 22h2v1h-2zM26 22h1v1h-1zM28 22h1v1h-1zM0 23h1v1h-1zM6 23h1v1h-1zM8 23h2v1h-2zM11 23h1v1h-1zM14 23h1v1h-1zM17 23h1v1h-1zM19 23h1v1h-1zM24 23h1v1h-1zM26 23h1v1h-1zM0 24h1v1h-1zM2 24h3v1h-3zM6 24h1v1h-1zM8 24h1v1h-1zM10 24h3v1h-3zM15 24h1v1h-1zM17 24h1v1h-1zM19 24h5v1h-5zM25 24h4v1h-4zM0 25h1v1h-1zM2 25h3v1h-3zM6 25h1v1h-1zM8 25h3v1h-3zM12 25h2v1h-2zM15 25h1v1h-1zM19 25h2v1h-2zM22 25h1v1h-1zM25 25h1v1h-1zM27 25h1v1h-1zM0 26h1v1h-1zM2 26h3v1h-3zM6 26h1v1h-1zM9 26h3v1h-3zM13 26h3v1h-3zM17 26h2v1h-2zM20 26h1v1h-1zM22 26h3v1h-3zM26 26h2v1h-2zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h1v1h-1zM10 27h1v1h-1zM12 27h1v1h-1zM14 27h3v1h-3zM18 27h2v1h-2zM21 27h3v1h-3zM25 27h1v1h-1zM28 27h1v1h-1zM0 28h7v1h-7zM9 28h1v1h-1zM11 28h1v1h-1zM13 28h1v1h-1zM15 28h2v1h-2zM18 28h1v1h-1zM20 28h3v1h-3zM24 28h1v1h-1zM26 28h1v1h-1zM28 28h1v1h-1z" fill="black"/>
                        </svg>
                    </div>
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
    const tempHtmlPath = path.join(__dirname, '..', 'temp-flyer.html');
    fs.writeFileSync(tempHtmlPath, flyerHTML);
    
    // Navigate to the HTML file
    await page.goto(`file://${tempHtmlPath}`, {
      waitUntil: 'networkidle0'
    });
    
    // Wait a bit for everything to render
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
    
    console.log(`✅ PDF generated successfully at: ${pdfPath}`);
    
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