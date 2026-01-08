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
      padding: 20mm;
      background: linear-gradient(135deg, #FAF3C3 0%, #fff 50%, #FAF3C3 100%);
      position: relative;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #2D7D46;
    }

    .logo {
      width: 180px;
    }

    .header-text {
      text-align: right;
    }

    .header-text h1 {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      color: #404F4A;
      margin-bottom: 5px;
    }

    .header-text p {
      color: #2D7D46;
      font-weight: 600;
      font-size: 14px;
    }

    .hero {
      display: flex;
      gap: 30px;
      margin-bottom: 35px;
    }

    .hero-image {
      flex: 1;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .hero-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .product-showcase {
      flex: 0 0 160px;
      text-align: center;
    }

    .product-showcase img {
      height: 200px;
      object-fit: contain;
    }

    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      color: #404F4A;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #D4AF37;
    }

    .intro {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 25px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    .intro p {
      font-size: 13px;
      color: #666;
    }

    .intro strong {
      color: #2D7D46;
    }

    .price-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    .price-table th {
      background: #404F4A;
      color: white;
      padding: 14px 16px;
      text-align: left;
      font-weight: 600;
      font-size: 13px;
    }

    .price-table td {
      padding: 14px 16px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
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
      font-size: 16px;
    }

    .price-table .retail {
      color: #666;
    }

    .price-table .margin {
      background: #E8F5E9;
      color: #2D7D46;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 12px;
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
      background: linear-gradient(135deg, #E8F5E9 0%, #fff 100%);
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 25px;
    }

    .volume-section h3 {
      font-size: 16px;
      color: #2D7D46;
      margin-bottom: 15px;
    }

    .volume-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .volume-card {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .volume-card h4 {
      font-size: 15px;
      color: #404F4A;
      margin-bottom: 8px;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
    }

    .volume-card p {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }

    .volume-card .discount {
      color: #2D7D46;
      font-weight: 600;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-bottom: 25px;
    }

    .feature {
      background: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .feature-icon {
      font-size: 28px;
      margin-bottom: 8px;
    }

    .feature h4 {
      font-size: 12px;
      color: #404F4A;
      margin-bottom: 4px;
    }

    .feature p {
      font-size: 11px;
      color: #888;
    }

    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #2D7D46;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-left {
      font-size: 12px;
      color: #666;
    }

    .footer-left strong {
      color: #404F4A;
      display: block;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .footer-right {
      text-align: right;
      font-size: 11px;
      color: #888;
    }

    .badge {
      display: inline-block;
      background: #D4AF37;
      color: white;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      margin-left: 8px;
    }

    .highlight-row {
      background: linear-gradient(90deg, #E8F5E9, #fff) !important;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <img src="data:image/png;base64,${logoBase64}" alt="NEEMX PRO" class="logo">
      <div class="header-text">
        <h1>Wholesale Catalogus</h1>
        <p>Shops / CHOP / Retailers</p>
      </div>
    </div>

    <div class="hero">
      <div class="hero-image">
        <img src="data:image/webp;base64,${moodboardBase64}" alt="NEEMX PRO Moodboard">
      </div>
      <div class="hero-image">
        <img src="data:image/webp;base64,${sfeer2Base64}" alt="NEEMX PRO Product">
      </div>
    </div>

    <div class="intro">
      <p><strong>NEEMX PRO</strong> is een 100% natuurlijke botanische olie op basis van neemolie, speciaal ontwikkeld voor professionele kwekers en tuincentra. Ideaal voor biologische teelt en plantbescherming. <strong>±50–55% winkelmarge</strong> voor retailers.</p>
    </div>

    <h2 class="section-title">Groothandelsprijzen (excl. BTW)</h2>

    <table class="price-table">
      <tr>
        <th>Inhoud</th>
        <th>Uw Inkoopprijs</th>
        <th>Advies Retailprijs</th>
        <th>Marge</th>
      </tr>
      <tr>
        <td><strong>10 ml</strong></td>
        <td class="price">€11,95</td>
        <td class="retail">€24,95</td>
        <td><span class="margin">+109%</span></td>
      </tr>
      <tr class="highlight-row">
        <td><strong>30 ml</strong> <span class="badge">POPULAIR</span></td>
        <td class="price">€19,95</td>
        <td class="retail">€44,95</td>
        <td><span class="margin">+125%</span></td>
      </tr>
      <tr>
        <td><strong>50 ml</strong></td>
        <td class="price">€29,95</td>
        <td class="retail">€64,95</td>
        <td><span class="margin">+117%</span></td>
      </tr>
    </table>

    <div class="page-break page-2 page-2-content">
      <div class="volume-section">
        <h3>📦 Staffelkortingen (extra voordeel bij grotere afnames)</h3>
        <div class="volume-grid">
          <div class="volume-card">
            <h4>10 ml Staffel</h4>
            <p>48+ stuks: <span class="discount">€10,95</span> per stuk</p>
            <p>96+ stuks: <span class="discount">€9,95</span> per stuk</p>
          </div>
          <div class="volume-card">
            <h4>30 ml Staffel</h4>
            <p>48+ stuks: <span class="discount">€18,95</span> per stuk</p>
            <p>96+ stuks: <span class="discount">€17,95</span> per stuk</p>
          </div>
          <div class="volume-card">
            <h4>50 ml Staffel</h4>
            <p>24+ stuks: <span class="discount">€27,95</span> per stuk</p>
            <p>48+ stuks: <span class="discount">€25,95</span> per stuk</p>
          </div>
        </div>
      </div>

      <div class="features">
        <div class="feature">
          <div class="feature-icon">🌿</div>
          <h4>100% Natuurlijk</h4>
          <p>Biologisch afbreekbaar</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🛡️</div>
          <h4>Plantveilig</h4>
          <p>Geen chemische stoffen</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🚚</div>
          <h4>Snelle Levering</h4>
          <p>24-48 uur</p>
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
          Levering binnen 24-48 uur
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

  const outputPath = path.join(outputDir, 'NEEMX-PRO-Wholesale-Catalogus-2025.pdf');

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
