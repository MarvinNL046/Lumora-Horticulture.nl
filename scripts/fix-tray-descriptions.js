import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function fixDescriptions() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Tray-84 - kort en bondig met SEO keyword
    await sql`
      UPDATE products
      SET
        description = 'Professionele Paper Plug Tray met 84 cellen, ideaal als Paperbus Steenwol Plug alternatief. Ellepot FP 12+ technologie met 12+ maanden stabiliteit.

Celafmetingen: Ø38mm x 42mm diep. Tray afmetingen: 540 x 280 x 42mm. Volume per cel: ±40ml. Materiaal: 100% biologisch afbreekbaar papier. Verpakking: 8 trays per doos.

Direct plantbaar zonder transplantatieschok. Uitstekende wortelontwikkeling door luchtsnoeïng. Duurzaam alternatief voor traditionele steenwol pluggen. Ideaal voor groenten, kruiden en snijbloemen.',

        description_en = 'Professional Paper Plug Tray with 84 cells, ideal as paper plug alternative to rockwool plugs. Ellepot FP 12+ technology with 12+ months stability.

Cell dimensions: Ø38mm x 42mm deep. Tray dimensions: 540 x 280 x 42mm. Volume per cell: ±40ml. Material: 100% biodegradable paper. Packaging: 8 trays per box.

Direct plantable without transplant shock. Excellent root development through air pruning. Sustainable alternative to traditional rockwool plugs. Ideal for vegetables, herbs and cut flowers.',

        description_de = 'Professionelles Paper Plug Tray mit 84 Zellen, ideal als Papier-Plug-Alternative zu Steinwolle-Stecklingen. Ellepot FP 12+ Technologie mit 12+ Monaten Stabilität.

Zellenabmessungen: Ø38mm x 42mm tief. Tablettabmessungen: 540 x 280 x 42mm. Volumen pro Zelle: ±40ml. Material: 100% biologisch abbaubares Papier. Verpackung: 8 Tabletts pro Karton.

Direkt pflanzbar ohne Transplantationsschock. Hervorragende Wurzelentwicklung durch Luftschnitt. Nachhaltige Alternative zu traditionellen Steinwolle-Stecklingen. Ideal für Gemüse, Kräuter und Schnittblumen.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    // Update Tray-104 - kort en bondig met SEO keyword
    await sql`
      UPDATE products
      SET
        description = 'Professionele Paper Plug Tray met 104 cellen, ideaal als Paperbus Steenwol Plug alternatief. Ellepot FP 12+ technologie met 12+ maanden stabiliteit.

Celafmetingen: Ø32mm x 40mm diep. Tray afmetingen: 540 x 280 x 40mm. Volume per cel: ±30ml. Materiaal: 100% biologisch afbreekbaar papier. Verpakking: 7 trays per doos.

Direct plantbaar zonder transplantatieschok. Uitstekende wortelontwikkeling door luchtsnoeïng. Hogere plantdichtheid voor maximale ruimtebenutting. Duurzaam alternatief voor traditionele steenwol pluggen. Ideaal voor groenten, kruiden en snijbloemen.',

        description_en = 'Professional Paper Plug Tray with 104 cells, ideal as paper plug alternative to rockwool plugs. Ellepot FP 12+ technology with 12+ months stability.

Cell dimensions: Ø32mm x 40mm deep. Tray dimensions: 540 x 280 x 40mm. Volume per cell: ±30ml. Material: 100% biodegradable paper. Packaging: 7 trays per box.

Direct plantable without transplant shock. Excellent root development through air pruning. Higher plant density for maximum space utilization. Sustainable alternative to traditional rockwool plugs. Ideal for vegetables, herbs and cut flowers.',

        description_de = 'Professionelles Paper Plug Tray mit 104 Zellen, ideal als Papier-Plug-Alternative zu Steinwolle-Stecklingen. Ellepot FP 12+ Technologie mit 12+ Monaten Stabilität.

Zellenabmessungen: Ø32mm x 40mm tief. Tablettabmessungen: 540 x 280 x 40mm. Volumen pro Zelle: ±30ml. Material: 100% biologisch abbaubares Papier. Verpackung: 7 Tabletts pro Karton.

Direkt pflanzbar ohne Transplantationsschock. Hervorragende Wurzelentwicklung durch Luftschnitt. Höhere Pflanzendichte für maximale Raumnutzung. Nachhaltige Alternative zu traditionellen Steinwolle-Stecklingen. Ideal für Gemüse, Kräuter und Schnittblumen.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('✅ Descriptions fixed - kort en bondig met SEO keyword!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixDescriptions();
