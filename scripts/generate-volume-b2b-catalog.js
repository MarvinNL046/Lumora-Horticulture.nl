const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateCatalog() {
  // Ensure output directory exists
  const outputDir = path.join(__dirname, '../catalogs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Convert images to base64 for embedding
  const logoPath = path.join(__dirname, '../public/productAfbeeldingen/neemxpro/neemxpro-logo.png');
  const moodboardPath = path.join(__dirname, '../public/productAfbeeldingen/neemxpro/neemxpro-product-moodboard.webp');
  const sfeer1Path = path.join(__dirname, '../public/productAfbeeldingen/neemxpro/neemxpro-sfeer-1.webp');
  const sfeer2Path = path.join(__dirname, '../public/productAfbeeldingen/neemxpro/neemxpro-sfeer-2.webp');

  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const moodboardBase64 = fs.readFileSync(moodboardPath).toString('base64');
  const sfeer1Base64 = fs.readFileSync(sfeer1Path).toString('base64');
  const sfeer2Base64 = fs.readFileSync(sfeer2Path).toString('base64');

  const html = `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      background: #fff;
      color: #404F4A;
      line-height: 1.6;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 18mm;
      background: linear-gradient(135deg, #E8F5E9 0%, #fff 50%, #E8F5E9 100%);
      position: relative;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 3px solid #2D7D46;
    }

    .logo {
      width: 160px;
    }

    .header-text {
      text-align: right;
    }

    .header-text h1 {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      color: #404F4A;
      margin-bottom: 4px;
    }

    .header-text p {
      color: #2D7D46;
      font-weight: 600;
      font-size: 12px;
    }

    .header-text .subtitle {
      font-size: 11px;
      color: #666;
      font-weight: 400;
    }

    .hero {
      display: flex;
      gap: 20px;
      margin-bottom: 25px;
    }

    .hero-image {
      flex: 1;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    .hero-image img {
      width: 100%;
      height: 160px;
      object-fit: cover;
    }

    .product-showcase {
      flex: 0 0 120px;
      text-align: center;
    }

    .product-showcase img {
      height: 160px;
      object-fit: contain;
    }

    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: #404F4A;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid #D4AF37;
    }

    .intro {
      background: white;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .intro p {
      font-size: 12px;
      color: #666;
    }

    .intro strong {
      color: #2D7D46;
    }

    .price-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .price-table th {
      background: #404F4A;
      color: white;
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      font-size: 11px;
    }

    .price-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #eee;
      font-size: 12px;
    }

    .price-table tr:last-child td {
      border-bottom: none;
    }

    .price-table tr:nth-child(even) {
      background: #f9f9f9;
    }

    .price-table .price {
      font-weight: 700;
      color: #2D7D46;
      font-size: 14px;
    }

    .price-table .min {
      color: #888;
      font-size: 11px;
    }

    .page-break {
      page-break-before: always;
      break-before: page;
    }

    .page-2 {
      padding-top: 35mm;
    }

    .page-2-content {
      position: relative;
      min-height: 225mm;
    }

    .page-2-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .volume-section {
      background: linear-gradient(135deg, #FFF8E1 0%, #fff 100%);
      padding: 18px;
      border-radius: 10px;
      margin-bottom: 20px;
      border: 2px solid #D4AF37;
    }

    .volume-section h3 {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      color: #404F4A;
      margin-bottom: 12px;
      text-align: center;
    }

    .volume-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }

    .volume-table th {
      background: #D4AF37;
      color: white;
      padding: 10px 12px;
      text-align: center;
      font-weight: 600;
      font-size: 11px;
    }

    .volume-table th:first-child {
      text-align: left;
    }

    .volume-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #eee;
      font-size: 12px;
      text-align: center;
    }

    .volume-table td:first-child {
      text-align: left;
      font-weight: 600;
    }

    .volume-table tr:last-child td {
      border-bottom: none;
    }

    .volume-table .best-price {
      background: #E8F5E9;
      font-weight: 700;
      color: #2D7D46;
    }

    .savings {
      display: inline-block;
      background: #2D7D46;
      color: white;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 9px;
      font-weight: 600;
      margin-left: 4px;
    }

    .target-audience {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }

    .audience-item {
      background: white;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .audience-item .icon {
      font-size: 22px;
      margin-bottom: 5px;
    }

    .audience-item h4 {
      font-size: 10px;
      color: #404F4A;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }

    .feature {
      background: white;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .feature-icon {
      font-size: 22px;
      margin-bottom: 5px;
    }

    .feature h4 {
      font-size: 10px;
      color: #404F4A;
      margin-bottom: 2px;
    }

    .feature p {
      font-size: 9px;
      color: #888;
    }

    .footer {
      margin-top: 20px;
      padding-top: 15px;
      border-top: 2px solid #2D7D46;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-left {
      font-size: 11px;
      color: #666;
    }

    .footer-left strong {
      color: #404F4A;
      display: block;
      font-size: 13px;
      margin-bottom: 3px;
    }

    .footer-right {
      text-align: right;
      font-size: 10px;
      color: #888;
    }

    .badge {
      display: inline-block;
      background: #D4AF37;
      color: white;
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 9px;
      font-weight: 600;
      margin-left: 6px;
    }

    .badge-green {
      background: #2D7D46;
    }

    .note {
      background: #FFF3CD;
      border-left: 4px solid #D4AF37;
      padding: 10px 12px;
      margin-bottom: 15px;
      font-size: 11px;
      border-radius: 0 8px 8px 0;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <img src="data:image/png;base64,${logoBase64}" alt="NEEMX PRO" class="logo">
      <div class="header-text">
        <h1>Volume B2B Catalogus</h1>
        <p>Overige Groothandels</p>
        <span class="subtitle">Tuincentra • Agro Leveranciers • Webshops • Export</span>
      </div>
    </div>

    <div class="hero">
      <div class="hero-image">
        <img src="data:image/webp;base64,${sfeer1Base64}" alt="NEEMX PRO">
      </div>
      <div class="hero-image">
        <img src="data:image/webp;base64,${moodboardBase64}" alt="NEEMX PRO Product">
      </div>
    </div>

    <div class="intro">
      <p><strong>NEEMX PRO</strong> – 100% natuurlijke botanische olie voor professionele kwekers. Ideaal voor biologische teelt, plantbescherming en duurzame tuinbouw. <strong>Volume-afspraken voor maximale marge.</strong></p>
    </div>

    <div class="target-audience">
      <div class="audience-item">
        <div class="icon">🏪</div>
        <h4>Tuincentra</h4>
      </div>
      <div class="audience-item">
        <div class="icon">🌾</div>
        <h4>Agro Leveranciers</h4>
      </div>
      <div class="audience-item">
        <div class="icon">🛒</div>
        <h4>Webshops</h4>
      </div>
      <div class="audience-item">
        <div class="icon">🌍</div>
        <h4>Export</h4>
      </div>
    </div>

    <h2 class="section-title">Basis Groothandelsprijzen (excl. BTW)</h2>

    <table class="price-table">
      <tr>
        <th>Inhoud</th>
        <th>Basis Groothandelsprijs</th>
        <th>Min. Afname</th>
      </tr>
      <tr>
        <td><strong>10 ml</strong></td>
        <td class="price">€9,95</td>
        <td class="min">100 stuks</td>
      </tr>
      <tr>
        <td><strong>30 ml</strong> <span class="badge badge-green">POPULAIR</span></td>
        <td class="price">€16,95</td>
        <td class="min">50 stuks</td>
      </tr>
      <tr>
        <td><strong>50 ml</strong></td>
        <td class="price">€24,95</td>
        <td class="min">25 stuks</td>
      </tr>
    </table>

    <div class="page-break page-2 page-2-content">
      <div class="volume-section">
        <h3>🏆 Volume Staffelprijzen – Maximale Korting</h3>
        <table class="volume-table">
          <tr>
            <th>Inhoud</th>
            <th>250+ stuks</th>
            <th>500+ stuks</th>
            <th>1000+ stuks</th>
          </tr>
          <tr>
            <td><strong>10 ml</strong></td>
            <td>€8,95</td>
            <td>€7,95</td>
            <td class="best-price">€6,95 <span class="savings">-30%</span></td>
          </tr>
          <tr>
            <td><strong>30 ml</strong></td>
            <td>€15,95</td>
            <td>€14,95</td>
            <td class="best-price">€13,95 <span class="savings">-18%</span></td>
          </tr>
          <tr>
            <td><strong>50 ml</strong></td>
            <td>€22,95</td>
            <td>€20,95</td>
            <td class="best-price">€18,95 <span class="savings">-24%</span></td>
          </tr>
        </table>
      </div>

      <div class="note">
        💡 <strong>Op maat gemaakte prijsafspraken mogelijk</strong> – Neem contact op voor jaarcontracten, exclusieve regio-afspraken of white-label mogelijkheden.
      </div>

      <div class="features">
        <div class="feature">
          <div class="feature-icon">🌿</div>
          <h4>100% Natuurlijk</h4>
          <p>Biologisch</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🛡️</div>
          <h4>Plantveilig</h4>
          <p>Geen chemicaliën</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🚚</div>
          <h4>Snelle Levering</h4>
          <p>24-48 uur</p>
        </div>
        <div class="feature">
          <div class="feature-icon">📦</div>
          <h4>Dropshipping</h4>
          <p>Mogelijk</p>
        </div>
      </div>

      <div class="footer page-2-footer">
        <div class="footer-left">
          <strong>Lumora Horticulture</strong>
          info@lumorahorticulture.nl | +31 (0)6 12345678<br>
          www.lumorahorticulture.nl
        </div>
        <div class="footer-right">
          Prijzen geldig t/m 31-12-2026<br>
          Alle prijzen excl. BTW<br>
          Alleen bij volume-afspraken
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const outputPath = path.join(outputDir, 'NEEMX-PRO-Volume-B2B-Catalogus-2025.pdf');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();

  console.log(`✅ PDF catalogus gegenereerd: ${outputPath}`);
}

generateCatalog().catch(console.error);
