import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/products/[id]
 * Haal een specifiek product op
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, params.id))
      .limit(1);

    if (!product || product.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: product[0],
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}
