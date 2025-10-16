import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updatePaperbus84Complete() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('📦 Updating PAPER PLUG TRAY 84 with complete description...\n');

  const sql = neon(process.env.DATABASE_URL);

  const descriptionNL = `Professionele PAPER PLUG TRAY 84 met Ellepot FP 12+ technologie - de ideale oplossing voor efficiënte zaailingenkweek in de professionele glastuinbouw.

🌱 PRODUCTSPECIFICATIES:
• 84 cellen per tray voor optimale productie-efficiëntie
• Ellepot FP 12+ paper plug technologie met 12+ maanden stabiliteit
• Celafmetingen: 38mm diameter x 42mm diepte
• Tray afmetingen: 540mm x 280mm x 42mm (LxBxH)
• Volume per cel: circa 40ml
• Materiaal: 100% biologisch afbreekbaar papier
• Verpakking: 8 trays per doos (672 cellen totaal)

✅ VOORDELEN:
• Direct plantbaar - geen transplantatieschok voor optimale groei
• Uitstekende wortelontwikkeling door luchtsnoeïng
• Duurzaam en biologisch afbreekbaar
• Bespaart arbeidstijd bij uitplanten
• Geschikt voor geautomatiseerde kweeksystemen
• Vermindert uitval en verhoogt gewaskwaliteit

🌿 TOEPASSINGEN:
Ideaal voor: groenten (tomaat, paprika, komkommer, aubergine), kruiden (basilicum, peterselie, tijm), snijbloemen, potplanten en zaailingen voor biologische teelt.

♻️ DUURZAAMHEID:
• 100% biologisch afbreekbaar
• Geen plastic afval
• Geschikt voor biologische teelt
• Milieuvriendelijk alternatief voor plastic pluggen

📦 LEVERINFORMATIE:
• Prijs per tray (minimaal 8 trays per bestelling)
• Direct van de fabrikant
• FP 12+ kwaliteitsgarantie
• Professionele B2B levering

Perfecte keuze voor professionele tuinders die waarde hechten aan kwaliteit, efficiëntie en duurzaamheid.`;

  const descriptionEN = `Professional PAPER PLUG TRAY 84 with Ellepot FP 12+ technology - the ideal solution for efficient seedling cultivation in professional greenhouse horticulture.

🌱 PRODUCT SPECIFICATIONS:
• 84 cells per tray for optimal production efficiency
• Ellepot FP 12+ paper plug technology with 12+ months stability
• Cell dimensions: 38mm diameter x 42mm depth
• Tray dimensions: 540mm x 280mm x 42mm (LxWxH)
• Volume per cell: approximately 40ml
• Material: 100% biodegradable paper
• Packaging: 8 trays per box (672 cells total)

✅ ADVANTAGES:
• Direct plantable - no transplant shock for optimal growth
• Excellent root development through air pruning
• Sustainable and biodegradable
• Saves labor time during transplanting
• Suitable for automated cultivation systems
• Reduces losses and improves crop quality

🌿 APPLICATIONS:
Ideal for: vegetables (tomato, pepper, cucumber, eggplant), herbs (basil, parsley, thyme), cut flowers, potted plants and seedlings for organic cultivation.

♻️ SUSTAINABILITY:
• 100% biodegradable
• No plastic waste
• Suitable for organic cultivation
• Environmentally friendly alternative to plastic plugs

📦 DELIVERY INFORMATION:
• Price per tray (minimum 8 trays per order)
• Direct from manufacturer
• FP 12+ quality guarantee
• Professional B2B delivery

Perfect choice for professional growers who value quality, efficiency and sustainability.`;

  const descriptionDE = `Professionelles PAPER PLUG TRAY 84 mit Ellepot FP 12+ Technologie - die ideale Lösung für effiziente Sämlingsanzucht im professionellen Gewächshausgartenbau.

🌱 PRODUKTSPEZIFIKATIONEN:
• 84 Zellen pro Tablett für optimale Produktionseffizienz
• Ellepot FP 12+ Paper-Plug-Technologie mit 12+ Monaten Stabilität
• Zellenabmessungen: 38mm Durchmesser x 42mm Tiefe
• Tablettabmessungen: 540mm x 280mm x 42mm (LxBxH)
• Volumen pro Zelle: ca. 40ml
• Material: 100% biologisch abbaubares Papier
• Verpackung: 8 Tabletts pro Karton (672 Zellen gesamt)

✅ VORTEILE:
• Direkt pflanzbar - kein Transplantationsschock für optimales Wachstum
• Hervorragende Wurzelentwicklung durch Luftschnitt
• Nachhaltig und biologisch abbaubar
• Spart Arbeitszeit beim Umpflanzen
• Geeignet für automatisierte Anbausysteme
• Reduziert Ausfall und verbessert Erntequalität

🌿 ANWENDUNGEN:
Ideal für: Gemüse (Tomate, Paprika, Gurke, Aubergine), Kräuter (Basilikum, Petersilie, Thymian), Schnittblumen, Topfpflanzen und Sämlinge für biologischen Anbau.

♻️ NACHHALTIGKEIT:
• 100% biologisch abbaubar
• Kein Plastikmüll
• Geeignet für biologischen Anbau
• Umweltfreundliche Alternative zu Plastikstecklingen

📦 LIEFERINFORMATIONEN:
• Preis pro Tablett (mindestens 8 Tabletts pro Bestellung)
• Direkt vom Hersteller
• FP 12+ Qualitätsgarantie
• Professionelle B2B-Lieferung

Perfekte Wahl für professionelle Gärtner, die Wert auf Qualität, Effizienz und Nachhaltigkeit legen.`;

  // Update metadata with technical specifications
  const metadata = {
    cells: 84,
    cell_diameter: "38mm",
    cell_depth: "42mm",
    cell_volume: "40ml",
    tray_dimensions: "540 x 280 x 42mm",
    tray_length: "540mm",
    tray_width: "280mm",
    tray_height: "42mm",
    material: "Biodegradable paper",
    technology: "Ellepot FP 12+",
    stability: "12+ months",
    trays_per_box: 8,
    cells_per_box: 672,
    biodegradable: true,
    suitable_for_organic: true,
    applications: [
      "vegetables",
      "herbs",
      "cut_flowers",
      "potted_plants",
      "seedlings"
    ],
    suitable_crops: [
      "tomato",
      "pepper",
      "cucumber",
      "eggplant",
      "basil",
      "parsley",
      "thyme"
    ]
  };

  try {
    await sql`
      UPDATE products
      SET description = ${descriptionNL},
          description_en = ${descriptionEN},
          description_de = ${descriptionDE},
          metadata = ${JSON.stringify(metadata)},
          updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    console.log('✅ PAPER PLUG TRAY 84 succesvol bijgewerkt met complete beschrijving!');
    console.log('\n📋 Toegevoegde informatie:');
    console.log('   • Technische specificaties (84 cellen, 38mm x 42mm, 40ml per cel)');
    console.log('   • Tray afmetingen (540 x 280 x 42mm)');
    console.log('   • Materiaal en technologie details');
    console.log('   • Voordelen en toepassingen');
    console.log('   • Duurzaamheidsinformatie');
    console.log('   • Leveringsinformatie');
    console.log('\n🌍 Bijgewerkt in alle talen: NL, EN, DE');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updatePaperbus84Complete();
