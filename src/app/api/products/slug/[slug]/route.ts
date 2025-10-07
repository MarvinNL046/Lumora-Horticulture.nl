import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'nl';

    const productResult = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    if (productResult.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = productResult[0];

    // Map product to correct language
    const translatedProduct = {
      ...product,
      name: locale === 'en' && product.name_en ? product.name_en :
            locale === 'de' && product.name_de ? product.name_de :
            product.name,
      description: locale === 'en' && product.description_en ? product.description_en :
                   locale === 'de' && product.description_de ? product.description_de :
                   product.description,
    };

    return NextResponse.json({
      success: true,
      product: translatedProduct,
    });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
