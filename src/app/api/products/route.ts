import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products?locale=nl|en|de
 * Haal alle producten op met optionele locale parameter
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'nl';

    const allProducts = await convex.query(api.products.list, { locale });

    // The Convex query already handles locale translation
    return NextResponse.json({
      success: true,
      products: allProducts,
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
