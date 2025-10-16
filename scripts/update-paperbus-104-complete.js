import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updatePaperbus104Complete() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('📦 Updating PAPER PLUG TRAY 104 with complete description...\n');

  const sql = neon(process.env.DATABASE_URL);

  const descriptionNL = `Professionele PAPER PLUG TRAY 104 met Ellepot FP 12+ technologie - de ideale oplossing voor intensieve zaailingenkweek in de professionele glastuinbouw.

🌱 PRODUCTSPECIFICATIES:
• 104 cellen per tray voor maximale productie-efficiëntie
• Ellepot FP 12+ paper plug technologie met 12+ maanden stabiliteit
• Celafmetingen: 32mm diameter x 40mm diepte
• Tray afmetingen: 540mm x 280mm x 40mm (LxBxH)
• Volume per cel: circa 30ml
• Materiaal: 100% biologisch afbreekbaar papier
• Verpakking: 7 trays per doos (728 cellen totaal)

✅ VOORDELEN:
• Direct plantbaar - geen transplantatieschok voor optimale groei
• Uitstekende wortelontwikkeling door luchtsnoeïng
• Hogere plantdichtheid voor maximale ruimtebenutting
• Duurzaam en biologisch afbreekbaar
• Bespaart arbeidstijd bij uitplanten
• Geschikt voor geautomatiseerde kweeksystemen
• Vermindert uitval en verhoogt gewaskwaliteit

🌿 TOEPASSINGEN:
Ideaal voor: groenten (tomaat, paprika, komkommer, aubergine, sla), kruiden (basilicum, peterselie, tijm, oregano, munt), snijbloemen, potplanten en zaailingen voor biologische teelt. Perfect voor kleinere plantsoorten en intensieve productie.

♻️ DUURZAAMHEID:
• 100% biologisch afbreekbaar
• Geen plastic afval
• Geschikt voor biologische teelt
• Milieuvriendelijk alternatief voor plastic pluggen
• CO2-neutraal productieproces

📦 LEVERINFORMATIE:
• Prijs per tray (minimaal 7 trays per bestelling)
• Direct van de fabrikant
• FP 12+ kwaliteitsgarantie
• Professionele B2B levering

Perfecte keuze voor professionele tuinders die waarde hechten aan kwaliteit, efficiëntie, hoge plantdichtheid en duurzaamheid.`;

  const descriptionEN = `Professional PAPER PLUG TRAY 104 with Ellepot FP 12+ technology - the ideal solution for intensive seedling cultivation in professional greenhouse horticulture.

🌱 PRODUCT SPECIFICATIONS:
• 104 cells per tray for maximum production efficiency
• Ellepot FP 12+ paper plug technology with 12+ months stability
• Cell dimensions: 32mm diameter x 40mm depth
• Tray dimensions: 540mm x 280mm x 40mm (LxWxH)
• Volume per cell: approximately 30ml
• Material: 100% biodegradable paper
• Packaging: 7 trays per box (728 cells total)

✅ ADVANTAGES:
• Direct plantable - no transplant shock for optimal growth
• Excellent root development through air pruning
• Higher plant density for maximum space utilization
• Sustainable and biodegradable
• Saves labor time during transplanting
• Suitable for automated cultivation systems
• Reduces losses and improves crop quality

🌿 APPLICATIONS:
Ideal for: vegetables (tomato, pepper, cucumber, eggplant, lettuce), herbs (basil, parsley, thyme, oregano, mint), cut flowers, potted plants and seedlings for organic cultivation. Perfect for smaller plant varieties and intensive production.

♻️ SUSTAINABILITY:
• 100% biodegradable
• No plastic waste
• Suitable for organic cultivation
• Environmentally friendly alternative to plastic plugs
• CO2-neutral production process

📦 DELIVERY INFORMATION:
• Price per tray (minimum 7 trays per order)
• Direct from manufacturer
• FP 12+ quality guarantee
• Professional B2B delivery

Perfect choice for professional growers who value quality, efficiency, high plant density and sustainability.`;

  const descriptionDE = `Professionelles PAPER PLUG TRAY 104 mit Ellepot FP 12+ Technologie - die ideale Lösung für intensive Sämlingsanzucht im professionellen Gewächshausgartenbau.

🌱 PRODUKTSPEZIFIKATIONEN:
• 104 Zellen pro Tablett für maximale Produktionseffizienz
• Ellepot FP 12+ Paper-Plug-Technologie mit 12+ Monaten Stabilität
• Zellenabmessungen: 32mm Durchmesser x 40mm Tiefe
• Tablettabmessungen: 540mm x 280mm x 40mm (LxBxH)
• Volumen pro Zelle: ca. 30ml
• Material: 100% biologisch abbaubares Papier
• Verpackung: 7 Tabletts pro Karton (728 Zellen gesamt)

✅ VORTEILE:
• Direkt pflanzbar - kein Transplantationsschock für optimales Wachstum
• Hervorragende Wurzelentwicklung durch Luftschnitt
• Höhere Pflanzendichte für maximale Raumnutzung
• Nachhaltig und biologisch abbaubar
• Spart Arbeitszeit beim Umpflanzen
• Geeignet für automatisierte Anbausysteme
• Reduziert Ausfall und verbessert Erntequalität

🌿 ANWENDUNGEN:
Ideal für: Gemüse (Tomate, Paprika, Gurke, Aubergine, Salat), Kräuter (Basilikum, Petersilie, Thymian, Oregano, Minze), Schnittblumen, Topfpflanzen und Sämlinge für biologischen Anbau. Perfekt für kleinere Pflanzensorten und intensive Produktion.

♻️ NACHHALTIGKEIT:
• 100% biologisch abbaubar
• Kein Plastikmüll
• Geeignet für biologischen Anbau
• Umweltfreundliche Alternative zu Plastikstecklingen
• CO2-neutraler Produktionsprozess

📦 LIEFERINFORMATIONEN:
• Preis pro Tablett (mindestens 7 Tabletts pro Bestellung)
• Direkt vom Hersteller
• FP 12+ Qualitätsgarantie
• Professionelle B2B-Lieferung

Perfekte Wahl für professionelle Gärtner, die Wert auf Qualität, Effizienz, hohe Pflanzendichte und Nachhaltigkeit legen.`;

  // Update metadata with technical specifications
  const metadata = {
    cells: 104,
    cell_diameter: "32mm",
    cell_depth: "40mm",
    cell_volume: "30ml",
    tray_dimensions: "540 x 280 x 40mm",
    tray_length: "540mm",
    tray_width: "280mm",
    tray_height: "40mm",
    material: "Biodegradable paper",
    technology: "Ellepot FP 12+",
    stability: "12+ months",
    trays_per_box: 7,
    cells_per_box: 728,
    biodegradable: true,
    suitable_for_organic: true,
    co2_neutral: true,
    applications: [
      "vegetables",
      "herbs",
      "cut_flowers",
      "potted_plants",
      "seedlings",
      "intensive_production"
    ],
    suitable_crops: [
      "tomato",
      "pepper",
      "cucumber",
      "eggplant",
      "lettuce",
      "basil",
      "parsley",
      "thyme",
      "oregano",
      "mint"
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
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('✅ PAPER PLUG TRAY 104 succesvol bijgewerkt met complete beschrijving!');
    console.log('\n📋 Toegevoegde informatie:');
    console.log('   • Technische specificaties (104 cellen, 32mm x 40mm, 30ml per cel)');
    console.log('   • Tray afmetingen (540 x 280 x 40mm)');
    console.log('   • Materiaal en technologie details');
    console.log('   • Voordelen en toepassingen');
    console.log('   • Hogere plantdichtheid voor intensieve productie');
    console.log('   • Duurzaamheidsinformatie (incl. CO2-neutraal)');
    console.log('   • Leveringsinformatie (7 trays per doos = 728 cellen)');
    console.log('\n🌍 Bijgewerkt in alle talen: NL, EN, DE');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updatePaperbus104Complete();
