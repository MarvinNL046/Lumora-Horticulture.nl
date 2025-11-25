import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function shortenDescriptions() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Shortening Paper Plug Tray descriptions...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Tray-84 - VEEL korter
    await sql`
      UPDATE products
      SET
        description = 'Professionele Paper Plug Tray met 84 cellen voor efficiënte zaailingenkweek. Ellepot FP 12+ technologie met 12+ maanden stabiliteit.

Specificaties:
• 84 cellen per tray
• Celafmetingen: Ø38mm x 42mm diep
• Tray afmetingen: 540 x 280 x 42mm
• Volume per cel: ±40ml
• 100% biologisch afbreekbaar papier
• Verpakking: 8 trays per doos

Direct plantbaar zonder transplantatieschok. Uitstekende wortelontwikkeling door luchtsnoeïng. Ideaal voor groenten, kruiden en snijbloemen.',

        description_en = 'Professional Paper Plug Tray with 84 cells for efficient seedling cultivation. Ellepot FP 12+ technology with 12+ months stability.

Specifications:
• 84 cells per tray
• Cell dimensions: Ø38mm x 42mm deep
• Tray dimensions: 540 x 280 x 42mm
• Volume per cell: ±40ml
• 100% biodegradable paper
• Packaging: 8 trays per box

Direct plantable without transplant shock. Excellent root development through air pruning. Ideal for vegetables, herbs and cut flowers.',

        description_de = 'Professionelles Paper Plug Tray mit 84 Zellen für effiziente Sämlingsanzucht. Ellepot FP 12+ Technologie mit 12+ Monaten Stabilität.

Spezifikationen:
• 84 Zellen pro Tablett
• Zellenabmessungen: Ø38mm x 42mm tief
• Tablettabmessungen: 540 x 280 x 42mm
• Volumen pro Zelle: ±40ml
• 100% biologisch abbaubares Papier
• Verpackung: 8 Tabletts pro Karton

Direkt pflanzbar ohne Transplantationsschock. Hervorragende Wurzelentwicklung durch Luftschnitt. Ideal für Gemüse, Kräuter und Schnittblumen.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    // Update Tray-104 - VEEL korter
    await sql`
      UPDATE products
      SET
        description = 'Professionele Paper Plug Tray met 104 cellen voor intensieve zaailingenkweek. Ellepot FP 12+ technologie met 12+ maanden stabiliteit.

Specificaties:
• 104 cellen per tray
• Celafmetingen: Ø32mm x 40mm diep
• Tray afmetingen: 540 x 280 x 40mm
• Volume per cel: ±30ml
• 100% biologisch afbreekbaar papier
• Verpakking: 7 trays per doos

Direct plantbaar zonder transplantatieschock. Uitstekende wortelontwikkeling door luchtsnoeïng. Hogere plantdichtheid voor maximale ruimtebenutting. Ideaal voor groenten, kruiden en snijbloemen.',

        description_en = 'Professional Paper Plug Tray with 104 cells for intensive seedling cultivation. Ellepot FP 12+ technology with 12+ months stability.

Specifications:
• 104 cells per tray
• Cell dimensions: Ø32mm x 40mm deep
• Tray dimensions: 540 x 280 x 40mm
• Volume per cell: ±30ml
• 100% biodegradable paper
• Packaging: 7 trays per box

Direct plantable without transplant shock. Excellent root development through air pruning. Higher plant density for maximum space utilization. Ideal for vegetables, herbs and cut flowers.',

        description_de = 'Professionelles Paper Plug Tray mit 104 Zellen für intensive Sämlingsanzucht. Ellepot FP 12+ Technologie mit 12+ Monaten Stabilität.

Spezifikationen:
• 104 Zellen pro Tablett
• Zellenabmessungen: Ø32mm x 40mm tief
• Tablettabmessungen: 540 x 280 x 40mm
• Volumen pro Zelle: ±30ml
• 100% biologisch abbaubares Papier
• Verpackung: 7 Tabletts pro Karton

Direkt pflanzbar ohne Transplantationsschock. Hervorragende Wurzelentwicklung durch Luftschnitt. Höhere Pflanzendichte für maximale Raumnutzung. Ideal für Gemüse, Kräuter und Schnittblumen.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('✅ Descriptions shortened successfully!');
    console.log('');
    console.log('📦 Updated products:');
    console.log('  - PAPER PLUG TRAY 84: Veel kortere, bondige beschrijving');
    console.log('  - PAPER PLUG TRAY 104: Veel kortere, bondige beschrijving');
    console.log('');
    console.log('🌍 Updated in all languages: NL, EN, DE');
    console.log('');
  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

shortenDescriptions();
