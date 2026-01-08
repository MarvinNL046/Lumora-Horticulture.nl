#!/usr/bin/env node
/**
 * NEEMX PRO & Steenwol Pluggen - Cold Email Campaign Script
 *
 * ⚠️  WAARSCHUWING - LEES VOORDAT JE START ⚠️
 *
 * RISICO'S VAN COLD EMAILING:
 * 1. Je domein kan op blacklists komen (spam)
 * 2. Resend kan je account blokkeren bij te veel bounces
 * 3. GDPR: B2B cold emails zijn toegestaan, maar:
 *    - Je moet een legitiem belang hebben
 *    - Ontvangers moeten zich kunnen afmelden
 *    - Je moet je bedrijfsgegevens vermelden
 *
 * AANBEVELINGEN:
 * - Start met MAX 10-20 emails per dag
 * - Wacht 2-3 dagen en check bounces/spam reports
 * - Als alles goed gaat, verhoog naar 30-50/dag
 * - NOOIT meer dan 100/dag via Resend
 *
 * Usage:
 *   node scripts/send-cold-emails.js --test          # Test mode (1 email naar jezelf)
 *   node scripts/send-cold-emails.js --dry-run      # Simulatie zonder verzenden
 *   node scripts/send-cold-emails.js --limit=10     # Stuur max 10 emails
 *   node scripts/send-cold-emails.js --country=DE   # Alleen Duitse leads
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

// ============================================
// CONFIGURATIE
// ============================================
const CONFIG = {
  // Resend API
  resendApiKey: process.env.RESEND_API_KEY,
  fromEmail: 'Lumora Horticulture <info@lumorahorticulture.com>',
  replyTo: 'info@lumorahorticulture.com',

  // Rate limiting
  delayBetweenEmails: 5000,  // 5 seconden tussen emails
  maxEmailsPerRun: 20,       // Max emails per keer (veilig starten)

  // Files
  leadsFile: path.join(process.cwd(), 'leads', 'business-leads.csv'),
  sentLogFile: path.join(process.cwd(), 'leads', 'sent-emails.json'),

  // Test email (voor --test mode)
  testEmail: 'info@lumorahorticulture.com',
};

// ============================================
// EMAIL TEMPLATES
// ============================================
const templates = {
  DE: {
    subject: 'NEEMX PRO & Premium Stecklingsmedien – 2026 B2B Angebot',
    html: (businessName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 0; }
    .header { background: linear-gradient(135deg, #2D7D46, #404F4A); color: white; padding: 25px; text-align: center; }
    .content { padding: 25px; background: #ffffff; }
    .product { background: #f8f9fa; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #D4AF37; }
    .product-img { width: 100%; max-width: 280px; height: auto; border-radius: 8px; margin-bottom: 15px; }
    .cta { background: #2D7D46; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 8px 5px 8px 0; font-weight: bold; font-size: 14px; }
    .cta:hover { background: #245d36; }
    .cta-secondary { background: #404F4A; }
    .footer { padding: 20px; font-size: 12px; color: #666; background: #f8f9fa; border-top: 1px solid #eee; }
    ul { padding-left: 20px; }
    li { margin: 8px 0; }
    .highlight { color: #2D7D46; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin:0; font-size: 24px;">Lumora Horticulture</h1>
    <p style="margin:8px 0 0 0; opacity: 0.9; font-size: 14px;">Premium Produkte für professionelle Züchter</p>
  </div>

  <div class="content">
    <p>Sehr geehrte Damen und Herren,</p>

    <p>wir von <strong>Lumora Horticulture</strong> aus den Niederlanden möchten Ihnen zwei unserer Premium-Produkte für den professionellen Anbau vorstellen:</p>

    <div class="product">
      <img src="https://lumorahorticulture.com/productAfbeeldingen/neemxpro/neemxpro-product-moodboard.webp" alt="NEEMX PRO" class="product-img">
      <h3 style="margin-top:0; color: #D4AF37;">🌿 NEEMX PRO – 4x stärker als Standard-Neem</h3>
      <p>100% natürliches botanisches Ölkonzentrat für professionelle Blattpflege.</p>
      <ul>
        <li><strong>4x konzentrierter</strong> als herkömmliche Neem-Produkte</li>
        <li>Wirksam gegen Spinnmilben, Blattläuse, Thripse & Weiße Fliege</li>
        <li>Dosierung: nur 2,5-10 ml/L (statt 10-20 ml bei Standard)</li>
        <li class="highlight">Fragen Sie nach unseren attraktiven B2B-Preisen!</li>
      </ul>
    </div>

    <div class="product">
      <img src="https://lumorahorticulture.com/productAfbeeldingen/trays/tray84/steenwol-plug-84tray-sfeer.webp" alt="Steinwolle Stecklingsplugs" class="product-img">
      <h3 style="margin-top:0; color: #2D7D46;">🌱 Steinwolle Stecklingsplugs – Premium Anzuchtmedien</h3>
      <p>Hochwertige Steinwolle-Plugs für optimale Wurzelentwicklung.</p>
      <ul>
        <li><strong>84-Tray</strong> und <strong>104-Tray</strong> verfügbar</li>
        <li>Idealer pH-Wert und Wasserhaltung</li>
        <li>Perfekt für Stecklinge und Jungpflanzen</li>
        <li>Auch als <strong>Paperbus-Plugs</strong> (biologisch abbaubar)</li>
      </ul>
    </div>

    <div style="background: linear-gradient(135deg, #D4AF37, #B8962E); color: white; padding: 15px 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
      <h3 style="margin: 0 0 5px 0; font-size: 18px;">🎉 Exklusives 2026 Neujahrsaktion!</h3>
      <p style="margin: 0; font-size: 14px;">Nehmen Sie jetzt Kontakt auf und profitieren Sie von unseren speziellen Händlerkonditionen für 2026</p>
    </div>

    <h3 style="color: #2D7D46;">Warum Lumora Horticulture?</h3>
    <ul>
      <li>🏆 <strong>Premium Qualität</strong> aus den Niederlanden</li>
      <li>📦 <strong>Schnelle Lieferung</strong> nach Deutschland</li>
      <li>🎁 <strong>Kostenlose Produktmuster</strong> auf Anfrage</li>
      <li>💰 <strong>Attraktive B2B-Konditionen</strong> für Händler</li>
    </ul>

    <p style="font-size: 16px;"><strong>Interesse an einer Zusammenarbeit?</strong><br>
    Antworten Sie einfach auf diese E-Mail für unsere 2026 B2B-Preisliste:</p>

    <a href="mailto:info@lumorahorticulture.com?subject=B2B%20Anfrage%20-%20Produktmuster" class="cta">📧 Jetzt Kontakt aufnehmen</a>
    <a href="https://lumorahorticulture.de/neemx-pro" class="cta cta-secondary">🌿 NEEMX PRO ansehen</a>
    <a href="https://lumorahorticulture.de/steinwolle-stecklinge" class="cta cta-secondary">🌱 Stecklingsplugs ansehen</a>
  </div>

  <div class="footer">
    <p><strong>Lumora Horticulture</strong><br>
    E-Mail: info@lumorahorticulture.com<br>
    Web: lumorahorticulture.de</p>
    <p style="font-size: 11px; color: #999;">
      Sie erhalten diese E-Mail, da Ihr Unternehmen im Bereich Gartenbau/Growing tätig ist.
      Falls Sie keine weiteren E-Mails wünschen, antworten Sie bitte mit "Abmelden" im Betreff.
    </p>
  </div>
</body>
</html>
    `,
  },

  NL: {
    subject: 'NEEMX PRO & Premium Stekpluggen – 2026 B2B aanbieding',
    html: (businessName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 0; }
    .header { background: linear-gradient(135deg, #2D7D46, #404F4A); color: white; padding: 25px; text-align: center; }
    .content { padding: 25px; background: #ffffff; }
    .product { background: #f8f9fa; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #D4AF37; }
    .product-img { width: 100%; max-width: 280px; height: auto; border-radius: 8px; margin-bottom: 15px; }
    .cta { background: #2D7D46; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 8px 5px 8px 0; font-weight: bold; font-size: 14px; }
    .cta-secondary { background: #404F4A; }
    .footer { padding: 20px; font-size: 12px; color: #666; background: #f8f9fa; border-top: 1px solid #eee; }
    ul { padding-left: 20px; }
    li { margin: 8px 0; }
    .highlight { color: #2D7D46; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin:0; font-size: 24px;">Lumora Horticulture</h1>
    <p style="margin:8px 0 0 0; opacity: 0.9; font-size: 14px;">Premium producten voor professionele kwekers</p>
  </div>

  <div class="content">
    <p>Geachte heer/mevrouw,</p>

    <p>Wij van <strong>Lumora Horticulture</strong> willen graag twee van onze premium producten aan u voorstellen:</p>

    <div class="product">
      <img src="https://lumorahorticulture.com/productAfbeeldingen/neemxpro/neemxpro-product-moodboard.webp" alt="NEEMX PRO" class="product-img">
      <h3 style="margin-top:0; color: #D4AF37;">🌿 NEEMX PRO – 4x sterker dan standaard neem</h3>
      <p>100% natuurlijk botanisch olieconcentraat voor professionele bladverzorging.</p>
      <ul>
        <li><strong>4x geconcentreerder</strong> dan standaard neemproducten</li>
        <li>Effectief tegen spint, bladluis, trips & witte vlieg</li>
        <li>Dosering: slechts 2,5-10 ml/L (i.p.v. 10-20 ml bij standaard)</li>
        <li class="highlight">Vraag naar onze scherpe B2B-prijzen!</li>
      </ul>
    </div>

    <div class="product">
      <img src="https://lumorahorticulture.com/productAfbeeldingen/trays/tray84/steenwol-plug-84tray-sfeer.webp" alt="Steenwol Stekpluggen" class="product-img">
      <h3 style="margin-top:0; color: #2D7D46;">🌱 Steenwol Stekpluggen – Premium kweekmedium</h3>
      <p>Hoogwaardige steenwol pluggen voor optimale wortelontwikkeling.</p>
      <ul>
        <li><strong>84-Tray</strong> en <strong>104-Tray</strong> beschikbaar</li>
        <li>Ideale pH-waarde en vochtregulatie</li>
        <li>Perfect voor stekken en jonge planten</li>
        <li>Ook als <strong>Paperbus-pluggen</strong> (biologisch afbreekbaar)</li>
      </ul>
    </div>

    <div style="background: linear-gradient(135deg, #D4AF37, #B8962E); color: white; padding: 15px 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
      <h3 style="margin: 0 0 5px 0; font-size: 18px;">🎉 Exclusieve 2026 Nieuwjaarsactie!</h3>
      <p style="margin: 0; font-size: 14px;">Neem nu contact op en profiteer van onze speciale dealercondities voor 2026</p>
    </div>

    <h3 style="color: #2D7D46;">Waarom Lumora Horticulture?</h3>
    <ul>
      <li>🏆 <strong>Premium kwaliteit</strong> uit Nederland</li>
      <li>📦 <strong>Snelle levering</strong> binnen de Benelux</li>
      <li>🎁 <strong>Gratis productsamples</strong> op aanvraag</li>
      <li>💰 <strong>Aantrekkelijke B2B-condities</strong> voor dealers</li>
    </ul>

    <p style="font-size: 16px;"><strong>Interesse in een samenwerking?</strong><br>
    Reageer op deze email voor onze 2026 B2B-prijslijst:</p>

    <a href="mailto:info@lumorahorticulture.com?subject=B2B%20Aanvraag%20-%20Productsamples" class="cta">📧 Nu contact opnemen</a>
    <a href="https://lumorahorticulture.nl/neemx-pro" class="cta cta-secondary">🌿 NEEMX PRO bekijken</a>
    <a href="https://lumorahorticulture.nl/stekpluggen" class="cta cta-secondary">🌱 Stekpluggen bekijken</a>
  </div>

  <div class="footer">
    <p><strong>Lumora Horticulture</strong><br>
    E-mail: info@lumorahorticulture.com<br>
    Web: lumorahorticulture.nl</p>
    <p style="font-size: 11px; color: #999;">
      U ontvangt deze e-mail omdat uw bedrijf actief is in de tuinbouw/growing sector.
      Wilt u geen e-mails meer ontvangen? Reageer met "Afmelden" in het onderwerp.
    </p>
  </div>
</body>
</html>
    `,
  },

  EN: {
    subject: 'NEEMX PRO & Premium Propagation Plugs – 2026 B2B Offer',
    html: (businessName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0; padding: 0; }
    .header { background: linear-gradient(135deg, #2D7D46, #404F4A); color: white; padding: 25px; text-align: center; }
    .content { padding: 25px; background: #ffffff; }
    .product { background: #f8f9fa; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #D4AF37; }
    .product-img { width: 100%; max-width: 280px; height: auto; border-radius: 8px; margin-bottom: 15px; }
    .cta { background: #2D7D46; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 8px 5px 8px 0; font-weight: bold; font-size: 14px; }
    .cta-secondary { background: #404F4A; }
    .footer { padding: 20px; font-size: 12px; color: #666; background: #f8f9fa; border-top: 1px solid #eee; }
    ul { padding-left: 20px; }
    li { margin: 8px 0; }
    .highlight { color: #2D7D46; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin:0; font-size: 24px;">Lumora Horticulture</h1>
    <p style="margin:8px 0 0 0; opacity: 0.9; font-size: 14px;">Premium products for professional growers</p>
  </div>

  <div class="content">
    <p>Dear Sir/Madam,</p>

    <p>We at <strong>Lumora Horticulture</strong> from the Netherlands would like to introduce two of our premium products:</p>

    <div class="product">
      <img src="https://lumorahorticulture.com/productAfbeeldingen/neemxpro/neemxpro-product-moodboard.webp" alt="NEEMX PRO" class="product-img">
      <h3 style="margin-top:0; color: #D4AF37;">🌿 NEEMX PRO – 4x Stronger Than Standard Neem</h3>
      <p>100% natural botanical oil concentrate for professional leaf care.</p>
      <ul>
        <li><strong>4x more concentrated</strong> than standard neem products</li>
        <li>Effective against spider mites, aphids, thrips & whitefly</li>
        <li>Dosage: only 2.5-10 ml/L (vs 10-20 ml for standard)</li>
        <li class="highlight">Ask about our competitive B2B pricing!</li>
      </ul>
    </div>

    <div class="product">
      <img src="https://lumorahorticulture.com/productAfbeeldingen/trays/tray84/steenwol-plug-84tray-sfeer.webp" alt="Rockwool Cutting Plugs" class="product-img">
      <h3 style="margin-top:0; color: #2D7D46;">🌱 Rockwool Cutting Plugs – Premium Growing Media</h3>
      <p>High-quality rockwool plugs for optimal root development.</p>
      <ul>
        <li><strong>84-Tray</strong> and <strong>104-Tray</strong> available</li>
        <li>Ideal pH level and moisture retention</li>
        <li>Perfect for cuttings and young plants</li>
        <li>Also available as <strong>Paper Pot Plugs</strong> (biodegradable)</li>
      </ul>
    </div>

    <div style="background: linear-gradient(135deg, #D4AF37, #B8962E); color: white; padding: 15px 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
      <h3 style="margin: 0 0 5px 0; font-size: 18px;">🎉 Exclusive 2026 New Year Offer!</h3>
      <p style="margin: 0; font-size: 14px;">Contact us now and benefit from our special dealer terms for 2026</p>
    </div>

    <h3 style="color: #2D7D46;">Why Lumora Horticulture?</h3>
    <ul>
      <li>🏆 <strong>Premium quality</strong> from the Netherlands</li>
      <li>📦 <strong>Fast delivery</strong> across Europe</li>
      <li>🎁 <strong>Free product samples</strong> on request</li>
      <li>💰 <strong>Attractive B2B terms</strong> for dealers</li>
    </ul>

    <p style="font-size: 16px;"><strong>Interested in a partnership?</strong><br>
    Reply to this email for our 2026 B2B price list:</p>

    <a href="mailto:info@lumorahorticulture.com?subject=B2B%20Inquiry%20-%20Product%20Samples" class="cta">📧 Contact Us Now</a>
    <a href="https://lumorahorticulture.com/neemx-pro" class="cta cta-secondary">🌿 View NEEMX PRO</a>
    <a href="https://lumorahorticulture.com/rockwool-plugs" class="cta cta-secondary">🌱 View Cutting Plugs</a>
  </div>

  <div class="footer">
    <p><strong>Lumora Horticulture</strong><br>
    Email: info@lumorahorticulture.com<br>
    Web: lumorahorticulture.com</p>
    <p style="font-size: 11px; color: #999;">
      You received this email because your business operates in the horticulture/growing sector.
      If you don't wish to receive further emails, please reply with "Unsubscribe" in the subject.
    </p>
  </div>
</body>
</html>
    `,
  },
};

// Map countries to templates
const countryTemplateMap = {
  'DE': 'DE',
  'AT': 'DE',  // Austria -> German
  'CH': 'DE',  // Switzerland -> German
  'NL': 'NL',
  'BE': 'NL',  // Belgium -> Dutch (can also be French/German)
  'PL': 'EN',  // Poland -> English
  'US': 'EN',
  'UK': 'EN',
  'GB': 'EN',
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    // Handle quoted values
    const values = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i] || '';
    });
    return obj;
  });
}

function loadSentLog() {
  try {
    if (fs.existsSync(CONFIG.sentLogFile)) {
      return JSON.parse(fs.readFileSync(CONFIG.sentLogFile, 'utf-8'));
    }
  } catch (e) {
    console.log('  ⚠️  Could not load sent log, starting fresh');
  }
  return { sent: [], failed: [], lastRun: null };
}

function saveSentLog(log) {
  log.lastRun = new Date().toISOString();
  fs.writeFileSync(CONFIG.sentLogFile, JSON.stringify(log, null, 2));
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getTemplateForCountry(country) {
  return countryTemplateMap[country] || 'EN';
}

// ============================================
// MAIN SEND FUNCTION
// ============================================

async function sendEmail(resend, lead, template, dryRun = false) {
  const { subject, html } = template;
  const emailHtml = html(lead['Business Name']);

  if (dryRun) {
    console.log(`  📧 [DRY RUN] Would send to: ${lead.Email}`);
    console.log(`     Subject: ${subject}`);
    console.log(`     Template: ${lead.Country}`);
    return { success: true, dryRun: true };
  }

  try {
    const result = await resend.emails.send({
      from: CONFIG.fromEmail,
      to: lead.Email,
      replyTo: CONFIG.replyTo,
      subject: subject,
      html: emailHtml,
    });

    console.log(`  ✅ Sent to: ${lead.Email} (${lead['Business Name']})`);
    return { success: true, id: result.id };
  } catch (error) {
    console.log(`  ❌ Failed: ${lead.Email} - ${error.message}`);
    return { success: false, error: error.message };
  }
}

// ============================================
// MAIN FUNCTION
// ============================================

async function main() {
  console.log('\n');
  console.log('='.repeat(60));
  console.log('  LUMORA HORTICULTURE - Cold Email Campaign');
  console.log('  NEEMX PRO & Steenwol Pluggen');
  console.log('='.repeat(60));
  console.log('\n');

  // Parse arguments
  const args = process.argv.slice(2);
  const isTest = args.includes('--test');
  const isDryRun = args.includes('--dry-run');
  const limitArg = args.find(a => a.startsWith('--limit='));
  const countryArg = args.find(a => a.startsWith('--country='));

  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : CONFIG.maxEmailsPerRun;
  const filterCountry = countryArg ? countryArg.split('=')[1].toUpperCase() : null;

  // Show warnings
  if (!isDryRun && !isTest) {
    console.log('⚠️  WAARSCHUWING: Dit script stuurt ECHTE emails!');
    console.log('');
    console.log('   Risico\'s:');
    console.log('   • Je domein kan op spam blacklists komen');
    console.log('   • Resend kan je account blokkeren');
    console.log('   • GDPR: zorg voor opt-out mogelijkheid');
    console.log('');
    console.log('   Tip: Start met --dry-run of --test eerst!');
    console.log('');
    console.log('-'.repeat(60));
    console.log('');
  }

  // Check API key
  if (!CONFIG.resendApiKey) {
    console.error('❌ RESEND_API_KEY niet gevonden in .env.local');
    process.exit(1);
  }

  // Initialize Resend
  const resend = new Resend(CONFIG.resendApiKey);

  // Test mode
  if (isTest) {
    console.log('🧪 TEST MODE: Stuur 1 test email naar jezelf\n');

    const testLead = {
      Email: CONFIG.testEmail,
      'Business Name': 'Test Bedrijf',
      Country: 'NL',
    };

    const template = templates.NL;
    const result = await sendEmail(resend, testLead, template, false);

    if (result.success) {
      console.log('\n✅ Test email verzonden naar:', CONFIG.testEmail);
      console.log('   Check je inbox (en spam folder)!');
    }
    return;
  }

  // Load leads
  if (!fs.existsSync(CONFIG.leadsFile)) {
    console.error('❌ Leads bestand niet gevonden:', CONFIG.leadsFile);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(CONFIG.leadsFile, 'utf-8');
  let leads = parseCSV(csvContent);

  console.log(`📂 Loaded ${leads.length} leads from CSV`);

  // Filter by country if specified
  if (filterCountry) {
    leads = leads.filter(l => l.Country === filterCountry);
    console.log(`🔍 Filtered to ${leads.length} leads for country: ${filterCountry}`);
  }

  // Load sent log to skip already sent
  const sentLog = loadSentLog();
  const alreadySent = new Set(sentLog.sent.map(s => s.email));

  leads = leads.filter(l => !alreadySent.has(l.Email));
  console.log(`📧 ${leads.length} new leads to contact (${alreadySent.size} already sent)`);

  // Apply limit
  const toSend = leads.slice(0, limit);
  console.log(`🎯 Will send to ${toSend.length} leads (limit: ${limit})`);

  if (toSend.length === 0) {
    console.log('\n✅ Geen nieuwe leads om te contacten!');
    return;
  }

  console.log('\n' + '-'.repeat(60) + '\n');

  // Send emails
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < toSend.length; i++) {
    const lead = toSend[i];
    const templateKey = getTemplateForCountry(lead.Country);
    const template = templates[templateKey];

    console.log(`[${i + 1}/${toSend.length}] ${lead.Country} - ${lead.Category}`);

    const result = await sendEmail(resend, lead, template, isDryRun);

    if (result.success) {
      successCount++;
      if (!isDryRun) {
        sentLog.sent.push({
          email: lead.Email,
          businessName: lead['Business Name'],
          country: lead.Country,
          sentAt: new Date().toISOString(),
          messageId: result.id,
        });
      }
    } else {
      failCount++;
      sentLog.failed.push({
        email: lead.Email,
        businessName: lead['Business Name'],
        error: result.error,
        failedAt: new Date().toISOString(),
      });
    }

    // Rate limiting
    if (i < toSend.length - 1) {
      console.log(`  ⏳ Wachten ${CONFIG.delayBetweenEmails / 1000}s...`);
      await delay(CONFIG.delayBetweenEmails);
    }
  }

  // Save log
  if (!isDryRun) {
    saveSentLog(sentLog);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 SAMENVATTING:\n');
  console.log(`   ✅ Succesvol: ${successCount}`);
  console.log(`   ❌ Mislukt: ${failCount}`);
  console.log(`   📁 Log opgeslagen in: leads/sent-emails.json`);

  if (isDryRun) {
    console.log('\n   ℹ️  Dit was een DRY RUN - geen emails verzonden');
    console.log('   Voer uit zonder --dry-run om echt te versturen');
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

// Run
main().catch(console.error);
