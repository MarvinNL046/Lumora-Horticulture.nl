import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { asc } from 'drizzle-orm';

/**
 * GET /api/products?locale=nl|en|de
 * Haal alle producten op met optionele locale parameter
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'nl';

    const allProducts = await db.select().from(products).orderBy(asc(products.display_order));

    // Map products to correct language
    const translatedProducts = allProducts.map(product => ({
      ...product,
      name: locale === 'en' && product.name_en ? product.name_en :
            locale === 'de' && product.name_de ? product.name_de :
            product.name,
      description: locale === 'en' && product.description_en ? product.description_en :
                   locale === 'de' && product.description_de ? product.description_de :
                   product.description,
    }));

    return NextResponse.json({
      success: true,
      products: translatedProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
