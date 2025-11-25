import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function makeDescriptionsConcise() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Making Paper Plug Tray descriptions much shorter and concise...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Paper Plug Tray 84 - VEEL korter
    console.log('📝 Updating PAPER PLUG TRAY 84...');
    await sql`
      UPDATE products
      SET
        description = 'Professionele Paper Plug Tray met 84 cellen - het duurzame alternatief voor steenwol pluggen. Ellepot FP 12+ technologie met 12+ maanden stabiliteit.

Celafmetingen: Ø38mm x 42mm diep | Volume: ±40ml
100% biologisch afbreekbaar papier | Verpakking: 8 trays per doos

Direct plantbaar zonder transplantatieschok. Uitstekende wortelontwikkeling door luchtsnoeïng. Ideaal voor groenten, kruiden en snijbloemen.',

        description_en = 'Professional Paper Plug Tray with 84 cells - the sustainable alternative to rockwool plugs. Ellepot FP 12+ technology with 12+ months stability.

Cell dimensions: Ø38mm x 42mm deep | Volume: ±40ml
100% biodegradable paper | Packaging: 8 trays per box

Direct plantable without transplant shock. Excellent root development through air pruning. Ideal for vegetables, herbs and cut flowers.',

        description_de = 'Professionelles Paper Plug Tray mit 84 Zellen - die nachhaltige Alternative zu Steinwolle-Stecklingen. Ellepot FP 12+ Technologie mit 12+ Monaten Stabilität.

Zellenabmessungen: Ø38mm x 42mm tief | Volumen: ±40ml
100% biologisch abbaubares Papier | Verpackung: 8 Tabletts pro Karton

Direkt pflanzbar ohne Transplantationsschock. Hervorragende Wurzelentwicklung durch Luftschnitt. Ideal für Gemüse, Kräuter und Schnittblumen.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    // Update Paper Plug Tray 104 - VEEL korter
    console.log('📝 Updating PAPER PLUG TRAY 104...');
    await sql`
      UPDATE products
      SET
        description = 'Professionele Paper Plug Tray met 104 cellen - het duurzame alternatief voor steenwol pluggen. Ellepot FP 12+ technologie met 12+ maanden stabiliteit.

Celafmetingen: Ø32mm x 40mm diep | Volume: ±30ml
100% biologisch afbreekbaar papier | Verpakking: 7 trays per doos

Direct plantbaar zonder transplantatieschock. Uitstekende wortelontwikkeling door luchtsnoeïng. Hogere plantdichtheid voor maximale ruimtebenutting. Ideaal voor groenten, kruiden en snijbloemen.',

        description_en = 'Professional Paper Plug Tray with 104 cells - the sustainable alternative to rockwool plugs. Ellepot FP 12+ technology with 12+ months stability.

Cell dimensions: Ø32mm x 40mm deep | Volume: ±30ml
100% biodegradable paper | Packaging: 7 trays per box

Direct plantable without transplant shock. Excellent root development through air pruning. Higher plant density for maximum space utilization. Ideal for vegetables, herbs and cut flowers.',

        description_de = 'Professionelles Paper Plug Tray mit 104 Zellen - die nachhaltige Alternative zu Steinwolle-Stecklingen. Ellepot FP 12+ Technologie mit 12+ Monaten Stabilität.

Zellenabmessungen: Ø32mm x 40mm tief | Volumen: ±30ml
100% biologisch abbaubares Papier | Verpackung: 7 Tabletts pro Karton

Direkt pflanzbar ohne Transplantationsschock. Hervorragende Wurzelentwicklung durch Luftschnitt. Höhere Pflanzendichte für maximale Raumnutzung. Ideal für Gemüse, Kräuter und Schnittblumen.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('\n✅ Descriptions successfully shortened!\n');
    console.log('📝 Changes:');
    console.log('  ✓ Removed all emoji sections for cleaner look');
    console.log('  ✓ Kept only essential information');
    console.log('  ✓ Maintained SEO keyword "steenwol plug(gen)"');
    console.log('  ✓ Much more suitable for product pages');
    console.log('  ✓ Updated in all languages: NL, EN, DE\n');

  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

makeDescriptionsConcise();
