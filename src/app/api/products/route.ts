import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { isHiddenProductSlug } from '@/lib/hidden-products';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

/**
 * GET /api/products?locale=nl|en|de
 * Haal alle producten op met optionele locale parameter
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'nl';

    const allProducts = await convex.query(api.products.list, { locale });

    // Map Convex _id to id for frontend compatibility; exclude hidden products
    const products = allProducts
      .filter((p: any) => !isHiddenProductSlug(p.slug))
      .map((p: any) => ({ ...p, id: p._id }));

    return NextResponse.json({
      success: true,
      products,
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
