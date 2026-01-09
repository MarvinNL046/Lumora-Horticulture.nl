#!/usr/bin/env node
/**
 * NEEMX PRO & Steenwol Pluggen - Follow-up Email Campaign
 *
 * Voor leads die niet hebben gereageerd op de eerste email.
 * Kortere, directere boodschap met focus op actie.
 *
 * Usage:
 *   node scripts/send-followup-emails.js --test          # Test mode
 *   node scripts/send-followup-emails.js --dry-run      # Simulatie
 *   node scripts/send-followup-emails.js --limit=10     # Max 10 emails
 *   node scripts/send-followup-emails.js --country=DE   # Alleen Duitse leads
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

// ============================================
// CONFIGURATIE
// ============================================
const CONFIG = {
  resendApiKey: process.env.RESEND_API_KEY,
  fromEmail: 'Lumora Horticulture <info@lumorahorticulture.com>',
  replyTo: 'info@lumorahorticulture.com',

  delayBetweenEmails: 5000,
  maxEmailsPerRun: 20,

  leadsFile: path.join(process.cwd(), 'leads', 'business-leads.csv'),
  sentLogFile: path.join(process.cwd(), 'leads', 'followup-sent.json'),

  testEmail: 'info@lumorahorticulture.com',
};

// ============================================
// FOLLOW-UP TEMPLATES - Kort & Direct
// ============================================
const templates = {
  DE: {
    subject: 'Kurze Nachfrage: NEEMX PRO Muster für Sie?',
    html: (businessName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.7; color: #333; max-width: 600px; margin: 0; padding: 0; }
    .header { background: #2D7D46; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background: #ffffff; }
    .cta { background: #D4AF37; color: #1a1a1a !important; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-weight: bold; }
    .benefits { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { padding: 20px; font-size: 12px; color: #666; background: #f8f9fa; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin:0;">Lumora Horticulture</h2>
  </div>

  <div class="content">
    <p>Guten Tag,</p>

    <p>ich wollte kurz nachfragen, ob Sie meine E-Mail von letzter Woche erhalten haben.</p>

    <p>Wir haben gerade <strong>kostenlose Produktmuster</strong> von NEEMX PRO verfügbar – unserem 4x konzentrierten botanischen Ölkonzentrat.</p>

    <div class="benefits">
      <strong>Warum Händler NEEMX PRO lieben:</strong>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Höhere Marge durch Premium-Produkt</li>
        <li>Weniger Lagerplatz (4x konzentriert)</li>
        <li>Zufriedene Kunden = Wiederkäufer</li>
      </ul>
    </div>

    <p><strong>Soll ich Ihnen ein kostenloses Muster zusenden?</strong></p>

    <p>Antworten Sie einfach mit Ihrer Lieferadresse, und ich schicke es los.</p>

    <a href="mailto:info@lumorahorticulture.com?subject=Ja,%20bitte%20Muster%20zusenden&body=Lieferadresse:%0A%0A" class="cta">
      ✉️ Ja, Muster anfordern
    </a>

    <p style="margin-top: 30px;">Beste Grüße,<br>
    <strong>Das Lumora Team</strong></p>
  </div>

  <div class="footer">
    <p>Lumora Horticulture | info@lumorahorticulture.com | lumorahorticulture.de</p>
    <p style="font-size: 11px; color: #999;">
      Keine weiteren E-Mails? Antworten Sie mit "Abmelden".
    </p>
  </div>
</body>
</html>
    `,
  },

  NL: {
    subject: 'Korte vraag: Gratis NEEMX PRO sample voor u?',
    html: (businessName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.7; color: #333; max-width: 600px; margin: 0; padding: 0; }
    .header { background: #2D7D46; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background: #ffffff; }
    .cta { background: #D4AF37; color: #1a1a1a !important; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-weight: bold; }
    .benefits { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { padding: 20px; font-size: 12px; color: #666; background: #f8f9fa; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin:0;">Lumora Horticulture</h2>
  </div>

  <div class="content">
    <p>Beste,</p>

    <p>Even een korte opvolging op mijn eerdere e-mail.</p>

    <p>We hebben momenteel <strong>gratis productsamples</strong> beschikbaar van NEEMX PRO – ons 4x geconcentreerde botanische olieconcentraat.</p>

    <div class="benefits">
      <strong>Waarom dealers kiezen voor NEEMX PRO:</strong>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Hogere marge door premium product</li>
        <li>Minder opslagruimte nodig (4x geconcentreerd)</li>
        <li>Tevreden klanten = terugkerende klanten</li>
      </ul>
    </div>

    <p><strong>Zal ik een gratis sample opsturen?</strong></p>

    <p>Reageer met je verzendadres en ik stuur het op.</p>

    <a href="mailto:info@lumorahorticulture.com?subject=Ja,%20graag%20een%20sample&body=Verzendadres:%0A%0A" class="cta">
      ✉️ Ja, sample aanvragen
    </a>

    <p style="margin-top: 30px;">Met vriendelijke groet,<br>
    <strong>Het Lumora Team</strong></p>
  </div>

  <div class="footer">
    <p>Lumora Horticulture | info@lumorahorticulture.com | lumorahorticulture.nl</p>
    <p style="font-size: 11px; color: #999;">
      Geen e-mails meer? Reageer met "Afmelden".
    </p>
  </div>
</body>
</html>
    `,
  },

  EN: {
    subject: 'Quick question: Free NEEMX PRO sample for you?',
    html: (businessName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.7; color: #333; max-width: 600px; margin: 0; padding: 0; }
    .header { background: #2D7D46; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; background: #ffffff; }
    .cta { background: #D4AF37; color: #1a1a1a !important; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-weight: bold; }
    .benefits { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { padding: 20px; font-size: 12px; color: #666; background: #f8f9fa; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin:0;">Lumora Horticulture</h2>
  </div>

  <div class="content">
    <p>Hello,</p>

    <p>Just a quick follow-up on my previous email.</p>

    <p>We currently have <strong>free product samples</strong> available of NEEMX PRO – our 4x concentrated botanical oil concentrate.</p>

    <div class="benefits">
      <strong>Why dealers love NEEMX PRO:</strong>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Higher margins with premium product</li>
        <li>Less storage space needed (4x concentrated)</li>
        <li>Happy customers = repeat buyers</li>
      </ul>
    </div>

    <p><strong>Would you like me to send you a free sample?</strong></p>

    <p>Just reply with your shipping address and I'll send it out.</p>

    <a href="mailto:info@lumorahorticulture.com?subject=Yes,%20please%20send%20a%20sample&body=Shipping%20address:%0A%0A" class="cta">
      ✉️ Yes, request sample
    </a>

    <p style="margin-top: 30px;">Best regards,<br>
    <strong>The Lumora Team</strong></p>
  </div>

  <div class="footer">
    <p>Lumora Horticulture | info@lumorahorticulture.com | lumorahorticulture.com</p>
    <p style="font-size: 11px; color: #999;">
      No more emails? Reply with "Unsubscribe".
    </p>
  </div>
</body>
</html>
    `,
  },
};

// Country to template mapping
const countryTemplateMap = {
  'DE': 'DE',
  'AT': 'DE',
  'CH': 'DE',
  'NL': 'NL',
  'BE': 'NL',
  'PL': 'EN',
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

    if (result.error) {
      console.log(`  ❌ Failed: ${lead.Email} - ${result.error.message}`);
      return { success: false, error: result.error.message };
    }

    console.log(`  ✅ Sent to: ${lead.Email} (${lead['Business Name']})`);
    return { success: true, id: result.data?.id };
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
  console.log('  LUMORA HORTICULTURE - Follow-up Email Campaign');
  console.log('  Voor niet-reageerders');
  console.log('='.repeat(60));
  console.log('\n');

  const args = process.argv.slice(2);
  const isTest = args.includes('--test');
  const isDryRun = args.includes('--dry-run');
  const limitArg = args.find(a => a.startsWith('--limit='));
  const countryArg = args.find(a => a.startsWith('--country='));

  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : CONFIG.maxEmailsPerRun;
  const filterCountry = countryArg ? countryArg.split('=')[1].toUpperCase() : null;

  if (!isDryRun && !isTest) {
    console.log('⚠️  WAARSCHUWING: Dit script stuurt ECHTE follow-up emails!');
    console.log('');
    console.log('   Tip: Start met --dry-run of --test eerst!');
    console.log('');
    console.log('-'.repeat(60));
    console.log('');
  }

  if (!CONFIG.resendApiKey) {
    console.error('❌ RESEND_API_KEY niet gevonden in .env.local');
    process.exit(1);
  }

  const resend = new Resend(CONFIG.resendApiKey);

  // Test mode
  if (isTest) {
    console.log('🧪 TEST MODE: Stuur 1 test follow-up email naar jezelf\n');

    const testLead = {
      Email: CONFIG.testEmail,
      'Business Name': 'Test Bedrijf',
      Country: 'NL',
    };

    const template = templates.NL;
    const result = await sendEmail(resend, testLead, template, false);

    if (result.success) {
      console.log('\n✅ Test follow-up email verzonden naar:', CONFIG.testEmail);
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

  if (filterCountry) {
    leads = leads.filter(l => l.Country === filterCountry);
    console.log(`🔍 Filtered to ${leads.length} leads for country: ${filterCountry}`);
  }

  // Load follow-up sent log
  const sentLog = loadSentLog();
  const alreadySent = new Set(sentLog.sent.map(s => s.email));

  leads = leads.filter(l => !alreadySent.has(l.Email));
  console.log(`📧 ${leads.length} leads nog niet ge-follow-upped (${alreadySent.size} already sent)`);

  const toSend = leads.slice(0, limit);
  console.log(`🎯 Will send to ${toSend.length} leads (limit: ${limit})`);

  if (toSend.length === 0) {
    console.log('\n✅ Geen leads om follow-up te sturen!');
    return;
  }

  console.log('\n' + '-'.repeat(60) + '\n');

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

    if (i < toSend.length - 1) {
      console.log(`  ⏳ Wachten ${CONFIG.delayBetweenEmails / 1000}s...`);
      await delay(CONFIG.delayBetweenEmails);
    }
  }

  if (!isDryRun) {
    saveSentLog(sentLog);
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 SAMENVATTING:\n');
  console.log(`   ✅ Succesvol: ${successCount}`);
  console.log(`   ❌ Mislukt: ${failCount}`);
  console.log(`   📁 Log opgeslagen in: leads/followup-sent.json`);

  if (isDryRun) {
    console.log('\n   ℹ️  Dit was een DRY RUN - geen emails verzonden');
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

main().catch(console.error);
