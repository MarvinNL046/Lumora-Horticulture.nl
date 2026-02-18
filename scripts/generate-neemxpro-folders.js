const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

// Translations for each language
const translations = {
  nl: {
    lang: 'nl',
    headerTitle: '100% Natuurlijke Gewasbescherming',
    headerSubtitle: 'Premium Kwaliteit voor Professionals',
    newBadge: 'NIEUW',
    subtitle: '100% Natuurlijk Botanisch Olieconcentraat',
    tagline: 'Premium bladverzorging voor professionele telers',
    intro: 'NEEMX PRO is een hoogwaardig, 100% natuurlijk botanisch olieconcentraat voor professionele bladverzorging. Het ondersteunt gezonde planten en helpt bij het voorkomen en verminderen van insectendruk door een beschermende oliefilm op het blad te vormen.',
    feature1: '100% Natuurlijk',
    feature2: '4x Geconcentreerd',
    feature3: 'Preventief & Curatief',
    feature4: 'Professionele Kwaliteit',
    strengthBadge: '4x Sterker',
    whyTitle: 'Waarom NEEMX PRO?',
    benefit1Title: 'Gezonde Bladeren',
    benefit1Desc: 'Ondersteunt gezonde en sterke bladeren voor optimale groei',
    benefit2Title: 'Preventief & Curatief',
    benefit2Desc: 'Helpt bij preventieve en curatieve gewasverzorging',
    benefit3Title: 'Beschermende Film',
    benefit3Desc: 'Vormt een beschermende oliefilm op het bladoppervlak',
    benefit4Title: 'Geschikt voor Stekken',
    benefit4Desc: 'Veilig voor jonge planten en stekken bij juiste dosering',
    benefit5Title: 'Zeer Geconcentreerd',
    benefit5Desc: 'Lage dosering nodig - 4x sterker dan standaard',
    benefit6Title: 'Makkelijk Mengbaar',
    benefit6Desc: 'Eenvoudig te mengen met water dankzij milde emulgator',
    dosageTitle: 'Dosering per Liter Water',
    shakeLabel: 'Schudden voor gebruik!',
    dosage1Label: 'Preventief',
    dosage1Sub: '(wekelijks)',
    dosage2Label: 'Normaal',
    dosage2Sub: 'gebruik',
    dosage3Label: 'Intensieve',
    dosage3Sub: 'verzorging',
    dosage4Label: 'Professioneel',
    dosage4Sub: '/ Zwaar',
    yieldTitle: 'Opbrengst per fles',
    yield1: '1-4 Liter spuitoplossing',
    yield2: '3-12 Liter spuitoplossing',
    yield3: '5-20 Liter spuitoplossing',
    effectiveTitle: 'Effectief tegen:',
    pest1: 'Spint',
    pest2: 'Zuigende insecten',
    pest3: 'Bladluis',
    pest4: 'Trips',
    pest5: 'Witte vlieg',
    pest6: 'Meeldauw',
    footerTitle: 'Meer informatie & Bestellen',
    footerDesc: 'Scan de QR-code of bezoek onze website voor productdetails, doseringsinstructies en om direct te bestellen.',
    footerUrl: 'lumorahorticulture.nl',
    footerScan: 'Scan mij!',
    qrUrl: 'https://lumorahorticulture.nl/neemx-pro',
    filename: 'NEEMX-PRO-Folder-NL.pdf',
  },
  en: {
    lang: 'en',
    headerTitle: '100% Natural Plant Protection',
    headerSubtitle: 'Premium Quality for Professionals',
    newBadge: 'NEW',
    subtitle: '100% Natural Botanical Oil Concentrate',
    tagline: 'Premium leaf care for professional growers',
    intro: 'NEEMX PRO is a high-quality, 100% natural botanical oil concentrate for professional leaf care. It supports healthy plants and helps prevent and reduce insect pressure by forming a protective oil film on the leaf surface.',
    feature1: '100% Natural',
    feature2: '4x Concentrated',
    feature3: 'Preventive & Curative',
    feature4: 'Professional Quality',
    strengthBadge: '4x Stronger',
    whyTitle: 'Why NEEMX PRO?',
    benefit1Title: 'Healthy Leaves',
    benefit1Desc: 'Supports healthy and strong leaves for optimal growth',
    benefit2Title: 'Preventive & Curative',
    benefit2Desc: 'Helps with preventive and curative plant care',
    benefit3Title: 'Protective Film',
    benefit3Desc: 'Forms a protective oil film on the leaf surface',
    benefit4Title: 'Suitable for Cuttings',
    benefit4Desc: 'Safe for young plants and cuttings at correct dosage',
    benefit5Title: 'Highly Concentrated',
    benefit5Desc: 'Low dosage needed - 4x stronger than standard',
    benefit6Title: 'Easy to Mix',
    benefit6Desc: 'Easy to mix with water thanks to mild emulsifier',
    dosageTitle: 'Dosage per Litre of Water',
    shakeLabel: 'Shake before use!',
    dosage1Label: 'Preventive',
    dosage1Sub: '(weekly)',
    dosage2Label: 'Normal',
    dosage2Sub: 'use',
    dosage3Label: 'Intensive',
    dosage3Sub: 'care',
    dosage4Label: 'Professional',
    dosage4Sub: '/ Heavy',
    yieldTitle: 'Yield per Bottle',
    yield1: '1-4 Litres spray solution',
    yield2: '3-12 Litres spray solution',
    yield3: '5-20 Litres spray solution',
    effectiveTitle: 'Effective against:',
    pest1: 'Spider mites',
    pest2: 'Sucking insects',
    pest3: 'Aphids',
    pest4: 'Thrips',
    pest5: 'Whitefly',
    pest6: 'Powdery mildew',
    footerTitle: 'More Information & Order',
    footerDesc: 'Scan the QR code or visit our website for product details, dosage instructions and to order directly.',
    footerUrl: 'lumorahorticulture.com',
    footerScan: 'Scan me!',
    qrUrl: 'https://lumorahorticulture.com/neemx-pro',
    filename: 'NEEMX-PRO-Folder-EN.pdf',
  },
};

function generateHTML(t, logoDataUrl, productImageDataUrl, qrCodeDataUrl) {
  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
    <meta charset="UTF-8">
    <title>NEEMX PRO - Lumora Horticulture</title>
    <style>
        @page { size: A4; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; width: 210mm; height: 297mm; margin: 0 auto; background: white; color: #404F4A; }
        .page { width: 210mm; height: 297mm; position: relative; overflow: hidden; background: #f8f8f8; display: flex; flex-direction: column; }

        /* Header */
        .header {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            padding: 4mm 15mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo { height: 13mm; width: auto; }
        .header-text { text-align: right; }
        .header-text h2 { font-size: 12pt; color: white; font-weight: 700; margin-bottom: 0.5mm; }
        .header-text p { font-size: 8.5pt; color: rgba(255,255,255,0.9); }

        /* Content */
        .content {
            flex: 1;
            padding: 6mm 15mm 4mm 15mm;
            background: white;
            display: flex;
            flex-direction: column;
        }

        /* Hero */
        .hero {
            display: flex;
            gap: 8mm;
            margin-bottom: 5mm;
        }
        .hero-left { flex: 1; }
        .hero-right { width: 65mm; text-align: center; }

        .title-row {
            display: flex;
            align-items: center;
            gap: 4mm;
            margin-bottom: 2mm;
        }

        h1 { font-size: 30pt; font-weight: 800; line-height: 1; }
        h1 .brand { color: #1f2937; }
        h1 .pro { color: #f59e0b; }

        .new-badge {
            display: inline-block;
            background: #ef4444;
            color: white;
            font-size: 9pt;
            font-weight: 800;
            padding: 1.5mm 3.5mm;
            border-radius: 6px;
            letter-spacing: 0.5px;
        }

        .subtitle { font-size: 12pt; color: #d97706; font-weight: 600; margin-bottom: 1.5mm; }
        .tagline { font-size: 9pt; color: #6b7280; margin-bottom: 3mm; font-style: italic; }
        .intro { font-size: 8.5pt; line-height: 1.5; color: #374151; margin-bottom: 4mm; }

        .hero-features { display: flex; flex-wrap: wrap; gap: 2.5mm; }
        .hero-feature {
            background: white;
            border: 1.5px solid #e5e7eb;
            font-size: 7.5pt;
            padding: 1.5mm 3.5mm;
            border-radius: 20px;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 1.5mm;
        }
        .hero-feature span { color: #22c55e; font-size: 8.5pt; }

        .product-image {
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            margin-bottom: 3mm;
        }
        .strength-badge {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            font-size: 10pt;
            font-weight: 700;
            padding: 2.5mm 5mm;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgba(245, 158, 11, 0.4);
        }

        /* Section titles */
        .section-title {
            font-size: 13pt;
            color: #1f2937;
            text-align: center;
            margin-bottom: 4mm;
            font-weight: 700;
        }
        .section-title:after {
            content: '';
            display: block;
            width: 50mm;
            height: 2.5px;
            background: linear-gradient(90deg, #f59e0b, #22c55e);
            margin: 2mm auto 0;
            border-radius: 2px;
        }

        /* Benefits grid */
        .benefits-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 3.5mm;
            margin-bottom: 5mm;
        }
        .benefit {
            background: white;
            border: 1.5px solid #e5e7eb;
            border-radius: 8px;
            padding: 3.5mm 3mm;
            text-align: center;
        }
        .benefit-icon { font-size: 16pt; margin-bottom: 1.5mm; display: block; }
        .benefit h3 { font-size: 8pt; color: #1f2937; font-weight: 700; margin-bottom: 1mm; }
        .benefit p { font-size: 7pt; line-height: 1.35; color: #6b7280; }

        /* Dosage section */
        .dosage-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4mm;
            margin-bottom: 3.5mm;
        }
        .dosage-title { font-size: 12pt; color: #1f2937; font-weight: 700; }
        .shake-badge {
            display: inline-flex;
            align-items: center;
            gap: 2mm;
            background: #fef3c7;
            border: 1.5px solid #fcd34d;
            border-radius: 20px;
            padding: 1.5mm 3.5mm;
            font-size: 7.5pt;
            color: #92400e;
            font-weight: 600;
        }

        .dosage-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 3mm;
            margin-bottom: 4mm;
        }
        .dosage-item {
            text-align: center;
            padding: 3mm 2mm;
            border-radius: 8px;
        }
        .dosage-item.level-1 { background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 1.5px solid #a7f3d0; }
        .dosage-item.level-2 { background: #f3f4f6; border: 1.5px solid #e5e7eb; }
        .dosage-item.level-3 { background: linear-gradient(135deg, #fef3c7, #fde68a); border: 1.5px solid #fcd34d; }
        .dosage-item.level-4 { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; }
        .dosage-amount { font-size: 13pt; font-weight: 800; margin-bottom: 1mm; }
        .dosage-label { font-size: 7.5pt; font-weight: 600; }
        .dosage-sub { font-size: 6.5pt; opacity: 0.8; }

        /* Yield section */
        .yield-title {
            font-size: 12pt;
            color: #1f2937;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3.5mm;
        }
        .yield-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 3mm;
            margin-bottom: 4mm;
        }
        .yield-item {
            text-align: center;
            padding: 3mm 2mm;
            border-radius: 8px;
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border: 1.5px solid #a7f3d0;
        }
        .yield-amount { font-size: 14pt; font-weight: 800; color: #1f2937; margin-bottom: 1mm; }
        .yield-desc { font-size: 7pt; color: #6b7280; }

        /* Effective against */
        .effective-title {
            font-size: 12pt;
            color: #1f2937;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3mm;
        }
        .pests-row {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 2.5mm;
            margin-bottom: 0;
        }
        .pest-pill {
            display: inline-flex;
            align-items: center;
            gap: 1.5mm;
            background: white;
            border: 1.5px solid #e5e7eb;
            border-radius: 20px;
            padding: 2mm 4mm;
            font-size: 7.5pt;
            color: #374151;
            font-weight: 500;
        }

        /* Footer */
        .footer {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            padding: 5mm 15mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .footer-left { flex: 1; }
        .footer-left h3 { font-size: 13pt; color: white; font-weight: 700; margin-bottom: 2mm; }
        .footer-left p { font-size: 8pt; color: rgba(255,255,255,0.9); line-height: 1.45; max-width: 115mm; }
        .footer-right {
            display: flex;
            align-items: center;
            gap: 3mm;
        }
        .qr-box {
            background: white;
            padding: 2.5mm;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .qr-box img { width: 20mm; height: 20mm; display: block; }
        .footer-url {
            text-align: center;
        }
        .footer-url .url { font-size: 8.5pt; color: white; font-weight: 700; }
        .footer-url .scan { font-size: 7pt; color: rgba(255,255,255,0.8); }
    </style>
</head>
<body>
    <div class="page">
        <!-- Header -->
        <div class="header">
            <img src="${logoDataUrl}" alt="Lumora Horticulture" class="logo">
            <div class="header-text">
                <h2>${t.headerTitle}</h2>
                <p>${t.headerSubtitle}</p>
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Hero -->
            <div class="hero">
                <div class="hero-left">
                    <div class="title-row">
                        <h1><span class="brand">NEEMX</span><span class="pro">PRO</span></h1>
                        <span class="new-badge">${t.newBadge}</span>
                    </div>
                    <p class="subtitle">${t.subtitle}</p>
                    <p class="tagline">${t.tagline}</p>
                    <p class="intro">${t.intro}</p>
                    <div class="hero-features">
                        <div class="hero-feature"><span>✓</span> ${t.feature1}</div>
                        <div class="hero-feature"><span>✓</span> ${t.feature2}</div>
                        <div class="hero-feature"><span>✓</span> ${t.feature3}</div>
                        <div class="hero-feature"><span>✓</span> ${t.feature4}</div>
                    </div>
                </div>
                <div class="hero-right">
                    <img src="${productImageDataUrl}" alt="NEEMX PRO" class="product-image">
                    <span class="strength-badge">${t.strengthBadge}</span>
                </div>
            </div>

            <!-- Benefits -->
            <h2 class="section-title">${t.whyTitle}</h2>
            <div class="benefits-grid">
                <div class="benefit">
                    <span class="benefit-icon">🌿</span>
                    <h3>${t.benefit1Title}</h3>
                    <p>${t.benefit1Desc}</p>
                </div>
                <div class="benefit">
                    <span class="benefit-icon">🛡️</span>
                    <h3>${t.benefit2Title}</h3>
                    <p>${t.benefit2Desc}</p>
                </div>
                <div class="benefit">
                    <span class="benefit-icon">💧</span>
                    <h3>${t.benefit3Title}</h3>
                    <p>${t.benefit3Desc}</p>
                </div>
                <div class="benefit">
                    <span class="benefit-icon">🌱</span>
                    <h3>${t.benefit4Title}</h3>
                    <p>${t.benefit4Desc}</p>
                </div>
                <div class="benefit">
                    <span class="benefit-icon">⚡</span>
                    <h3>${t.benefit5Title}</h3>
                    <p>${t.benefit5Desc}</p>
                </div>
                <div class="benefit">
                    <span class="benefit-icon">💦</span>
                    <h3>${t.benefit6Title}</h3>
                    <p>${t.benefit6Desc}</p>
                </div>
            </div>

            <!-- Dosage -->
            <div class="dosage-header">
                <span class="dosage-title">${t.dosageTitle}</span>
                <span class="shake-badge">🔄 ${t.shakeLabel}</span>
            </div>
            <div class="dosage-grid">
                <div class="dosage-item level-1">
                    <div class="dosage-amount">2,5 ml/L</div>
                    <div class="dosage-label">${t.dosage1Label}</div>
                    <div class="dosage-sub">${t.dosage1Sub}</div>
                </div>
                <div class="dosage-item level-2">
                    <div class="dosage-amount">5 ml/L</div>
                    <div class="dosage-label">${t.dosage2Label}</div>
                    <div class="dosage-sub">${t.dosage2Sub}</div>
                </div>
                <div class="dosage-item level-3">
                    <div class="dosage-amount">7 ml/L</div>
                    <div class="dosage-label">${t.dosage3Label}</div>
                    <div class="dosage-sub">${t.dosage3Sub}</div>
                </div>
                <div class="dosage-item level-4">
                    <div class="dosage-amount">10 ml/L</div>
                    <div class="dosage-label">${t.dosage4Label}</div>
                    <div class="dosage-sub">${t.dosage4Sub}</div>
                </div>
            </div>

            <!-- Yield per bottle -->
            <div class="yield-title">${t.yieldTitle}</div>
            <div class="yield-grid">
                <div class="yield-item">
                    <div class="yield-amount">10 ml</div>
                    <div class="yield-desc">${t.yield1}</div>
                </div>
                <div class="yield-item">
                    <div class="yield-amount">30 ml</div>
                    <div class="yield-desc">${t.yield2}</div>
                </div>
                <div class="yield-item">
                    <div class="yield-amount">50 ml</div>
                    <div class="yield-desc">${t.yield3}</div>
                </div>
            </div>

            <!-- Effective against -->
            <div class="effective-title">${t.effectiveTitle}</div>
            <div class="pests-row">
                <span class="pest-pill">🕷️ ${t.pest1}</span>
                <span class="pest-pill">🦟 ${t.pest2}</span>
                <span class="pest-pill">🐛 ${t.pest3}</span>
                <span class="pest-pill">🦗 ${t.pest4}</span>
                <span class="pest-pill">🪰 ${t.pest5}</span>
                <span class="pest-pill">🍄 ${t.pest6}</span>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-left">
                <h3>${t.footerTitle}</h3>
                <p>${t.footerDesc}</p>
            </div>
            <div class="footer-right">
                <div class="qr-box">
                    <img src="${qrCodeDataUrl}" alt="QR Code">
                </div>
                <div class="footer-url">
                    <div class="url">${t.footerUrl}</div>
                    <div class="scan">${t.footerScan}</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

async function generatePDFs() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // Read images as base64
    const logoPath = path.join(__dirname, '..', 'public', 'logo', 'lumura-horticulture-logo.jpeg');
    const logoBase64 = fs.readFileSync(logoPath, 'base64');
    const logoDataUrl = `data:image/jpeg;base64,${logoBase64}`;

    const productImagePath = path.join(__dirname, '..', 'public', 'productAfbeeldingen', 'neemxpro', 'neemxpro-sfeer-1.webp');
    const productImageBase64 = fs.readFileSync(productImagePath, 'base64');
    const productImageDataUrl = `data:image/webp;base64,${productImageBase64}`;

    const downloadsDir = path.join(__dirname, '..', 'public', 'downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    for (const [locale, t] of Object.entries(translations)) {
      console.log(`\nGenerating ${locale.toUpperCase()} PDF...`);

      // Generate QR code for the locale-specific URL
      const qrCodeDataUrl = await QRCode.toDataURL(t.qrUrl, {
        width: 200,
        margin: 1,
        color: { dark: '#000000', light: '#FFFFFF' },
      });

      const html = generateHTML(t, logoDataUrl, productImageDataUrl, qrCodeDataUrl);

      // Write temp HTML
      const tempHtmlPath = path.join(__dirname, '..', `temp-neemxpro-${locale}.html`);
      fs.writeFileSync(tempHtmlPath, html);

      // Generate PDF
      const page = await browser.newPage();
      await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const pdfPath = path.join(downloadsDir, t.filename);
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });

      await page.close();
      fs.unlinkSync(tempHtmlPath);

      const stats = fs.statSync(pdfPath);
      console.log(`  PDF saved: ${pdfPath}`);
      console.log(`  Size: ${(stats.size / 1024).toFixed(0)} KB`);
    }

    console.log('\nAll PDFs generated successfully!');
  } catch (error) {
    console.error('Error generating PDFs:', error);
  } finally {
    await browser.close();
  }
}

generatePDFs();
