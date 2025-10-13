const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function updateTrayImages() {
  try {
    console.log('Updating tray product images...');

    // Update Paper Plug Tray 84
    const tray84 = await sql`
      UPDATE products
      SET
        image_url = '/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg',
        metadata = jsonb_build_object(
          'images', jsonb_build_array(
            '/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg',
            '/productAfbeeldingen/trays/tray84/pluggen84-dichtdoos-schuinvoorkant-transparant.png',
            '/productAfbeeldingen/trays/tray84/pluggen84-opendoos-schuinvoorkant-transparant.png'
          ),
          'specifications', COALESCE((metadata->>'specifications')::jsonb, jsonb_build_object())
        ),
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
      RETURNING id, name, image_url, metadata;
    `;

    console.log('✓ Updated Paper Plug Tray 84:', tray84[0]);

    // Update Paper Plug Tray 104
    const tray104 = await sql`
      UPDATE products
      SET
        image_url = '/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.png',
        metadata = jsonb_build_object(
          'images', jsonb_build_array(
            '/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.png',
            '/productAfbeeldingen/trays/tray104/pluggen104-dichtdoos-schuinvoorkant-transparant.png',
            '/productAfbeeldingen/trays/tray104/pluggen104-opendoos-schuinvoorkant-transparant.png'
          ),
          'specifications', COALESCE((metadata->>'specifications')::jsonb, jsonb_build_object())
        ),
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
      RETURNING id, name, image_url, metadata;
    `;

    console.log('✓ Updated Paper Plug Tray 104:', tray104[0]);

    console.log('\n✅ All tray images updated successfully!');
  } catch (error) {
    console.error('❌ Error updating tray images:', error);
    process.exit(1);
  }
}

updateTrayImages();
