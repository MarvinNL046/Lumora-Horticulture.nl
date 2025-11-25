import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function improveDescriptions() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Updating Paper Plug Trays with SEO keyword "Paperbus Steenwol Plug"...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Paper Plug Tray 84 - add SEO keyword and improve formatting
    console.log('📝 Updating PAPER PLUG TRAY 84...');
    await sql`
      UPDATE products
      SET
        description = 'Professionele PAPER PLUG TRAY 84 met Ellepot FP 12+ technologie - de ideale Paperbus Steenwol Plug alternatief voor efficiënte zaailingenkweek in de professionele glastuinbouw.

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
• Duurzaam alternatief voor traditionele steenwol pluggen
• Bespaart arbeidstijd bij uitplanten
• Geschikt voor geautomatiseerde kweeksystemen
• Vermindert uitval en verhoogt gewaskwaliteit

🌿 TOEPASSINGEN:
Ideaal voor: groenten (tomaat, paprika, komkommer, aubergine), kruiden (basilicum, peterselie, tijm), snijbloemen, potplanten en zaailingen voor biologische teelt. Perfect als Paperbus Steenwol Plug vervanger.

♻️ DUURZAAMHEID:
• 100% biologisch afbreekbaar
• Geen plastic afval
• Geschikt voor biologische teelt
• Milieuvriendelijk alternatief voor plastic pluggen en steenwol

📦 LEVERINFORMATIE:
• Prijs per tray (minimaal 8 trays per bestelling)
• Direct van de fabrikant
• FP 12+ kwaliteitsgarantie
• Professionele B2B levering

Perfecte keuze voor professionele tuinders die waarde hechten aan kwaliteit, efficiëntie en duurzaamheid.',

        description_en = 'Professional PAPER PLUG TRAY 84 with Ellepot FP 12+ technology - the ideal paper plug alternative to rockwool plugs for efficient seedling cultivation in professional greenhouse horticulture.

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
• Sustainable alternative to traditional rockwool plugs
• Saves labor time during transplanting
• Suitable for automated cultivation systems
• Reduces losses and improves crop quality

🌿 APPLICATIONS:
Ideal for: vegetables (tomato, pepper, cucumber, eggplant), herbs (basil, parsley, thyme), cut flowers, potted plants and seedlings for organic cultivation. Perfect as paper plug replacement for rockwool plugs.

♻️ SUSTAINABILITY:
• 100% biodegradable
• No plastic waste
• Suitable for organic cultivation
• Environmentally friendly alternative to plastic plugs and rockwool

📦 DELIVERY INFORMATION:
• Price per tray (minimum 8 trays per order)
• Direct from manufacturer
• FP 12+ quality guarantee
• Professional B2B delivery

Perfect choice for professional growers who value quality, efficiency and sustainability.',

        description_de = 'Professionelles PAPER PLUG TRAY 84 mit Ellepot FP 12+ Technologie - die ideale Papier-Plug-Alternative zu Steinwolle-Stecklingen für effiziente Sämlingsanzucht im professionellen Gewächshausgartenbau.

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
• Nachhaltige Alternative zu traditionellen Steinwolle-Stecklingen
• Spart Arbeitszeit beim Umpflanzen
• Geeignet für automatisierte Anbausysteme
• Reduziert Ausfall und verbessert Erntequalität

🌿 ANWENDUNGEN:
Ideal für: Gemüse (Tomate, Paprika, Gurke, Aubergine), Kräuter (Basilikum, Petersilie, Thymian), Schnittblumen, Topfpflanzen und Sämlinge für biologischen Anbau. Perfekt als Papier-Plug-Ersatz für Steinwolle-Stecklinge.

♻️ NACHHALTIGKEIT:
• 100% biologisch abbaubar
• Kein Plastikmüll
• Geeignet für biologischen Anbau
• Umweltfreundliche Alternative zu Plastikstecklingen und Steinwolle

📦 LIEFERINFORMATIONEN:
• Preis pro Tablett (mindestens 8 Tabletts pro Bestellung)
• Direkt vom Hersteller
• FP 12+ Qualitätsgarantie
• Professionelle B2B-Lieferung

Perfekte Wahl für professionelle Gärtner, die Wert auf Qualität, Effizienz und Nachhaltigkeit legen.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    // Update Paper Plug Tray 104 - add SEO keyword
    console.log('📝 Updating PAPER PLUG TRAY 104...');
    await sql`
      UPDATE products
      SET
        description = 'Professionele PAPER PLUG TRAY 104 met Ellepot FP 12+ technologie - de ideale Paperbus Steenwol Plug oplossing voor intensieve zaailingenkweek in de professionele glastuinbouw.

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
• Duurzaam alternatief voor traditionele steenwol pluggen
• Bespaart arbeidstijd bij uitplanten
• Geschikt voor geautomatiseerde kweeksystemen
• Vermindert uitval en verhoogt gewaskwaliteit

🌿 TOEPASSINGEN:
Ideaal voor: groenten (tomaat, paprika, komkommer, aubergine, sla), kruiden (basilicum, peterselie, tijm, oregano, munt), snijbloemen, potplanten en zaailingen voor biologische teelt. Perfect als Paperbus Steenwol Plug vervanger voor kleinere plantsoorten en intensieve productie.

♻️ DUURZAAMHEID:
• 100% biologisch afbreekbaar
• Geen plastic afval
• Geschikt voor biologische teelt
• Milieuvriendelijk alternatief voor plastic pluggen en steenwol
• CO2-neutraal productieproces

📦 LEVERINFORMATIE:
• Prijs per tray (minimaal 7 trays per bestelling)
• Direct van de fabrikant
• FP 12+ kwaliteitsgarantie
• Professionele B2B levering

Perfecte keuze voor professionele tuinders die waarde hechten aan kwaliteit, efficiëntie, hoge plantdichtheid en duurzaamheid.',

        description_en = 'Professional PAPER PLUG TRAY 104 with Ellepot FP 12+ technology - the ideal paper plug solution as rockwool plug alternative for intensive seedling cultivation in professional greenhouse horticulture.

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
• Sustainable alternative to traditional rockwool plugs
• Saves labor time during transplanting
• Suitable for automated cultivation systems
• Reduces losses and improves crop quality

🌿 APPLICATIONS:
Ideal for: vegetables (tomato, pepper, cucumber, eggplant, lettuce), herbs (basil, parsley, thyme, oregano, mint), cut flowers, potted plants and seedlings for organic cultivation. Perfect as paper plug replacement for rockwool plugs for smaller plant varieties and intensive production.

♻️ SUSTAINABILITY:
• 100% biodegradable
• No plastic waste
• Suitable for organic cultivation
• Environmentally friendly alternative to plastic plugs and rockwool
• CO2-neutral production process

📦 DELIVERY INFORMATION:
• Price per tray (minimum 7 trays per order)
• Direct from manufacturer
• FP 12+ quality guarantee
• Professional B2B delivery

Perfect choice for professional growers who value quality, efficiency, high plant density and sustainability.',

        description_de = 'Professionelles PAPER PLUG TRAY 104 mit Ellepot FP 12+ Technologie - die ideale Papier-Plug-Lösung als Steinwolle-Steckling-Alternative für intensive Sämlingsanzucht im professionellen Gewächshausgartenbau.

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
• Nachhaltige Alternative zu traditionellen Steinwolle-Stecklingen
• Spart Arbeitszeit beim Umpflanzen
• Geeignet für automatisierte Anbausysteme
• Reduziert Ausfall und verbessert Erntequalität

🌿 ANWENDUNGEN:
Ideal für: Gemüse (Tomate, Paprika, Gurke, Aubergine, Salat), Kräuter (Basilikum, Petersilie, Thymian, Oregano, Minze), Schnittblumen, Topfpflanzen und Sämlinge für biologischen Anbau. Perfekt als Papier-Plug-Ersatz für Steinwolle-Stecklinge für kleinere Pflanzensorten und intensive Produktion.

♻️ NACHHALTIGKEIT:
• 100% biologisch abbaubar
• Kein Plastikmüll
• Geeignet für biologischen Anbau
• Umweltfreundliche Alternative zu Plastikstecklingen und Steinwolle
• CO2-neutraler Produktionsprozess

📦 LIEFERINFORMATIONEN:
• Preis pro Tablett (mindestens 7 Tabletts pro Bestellung)
• Direkt vom Hersteller
• FP 12+ Qualitätsgarantie
• Professionelle B2B-Lieferung

Perfekte Wahl für professionelle Gärtner, die Wert auf Qualität, Effizienz, hohe Pflanzendichte und Nachhaltigkeit legen.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('\n✅ Paper Plug Tray descriptions updated successfully!\n');
    console.log('📝 Changes made:');
    console.log('  ✓ Added SEO keyword "Paperbus Steenwol Plug" to both Paper Plug Trays');
    console.log('  ✓ Enhanced descriptions with steenwol plug alternative messaging');
    console.log('  ✓ Maintained consistent emoji-structured format');
    console.log('  ✓ Updated in all languages: NL, EN, DE\n');

  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

improveDescriptions();
