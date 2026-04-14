import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { isHiddenProductSlug } from '@/lib/hidden-products';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'nl';

    if (isHiddenProductSlug(slug)) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = await convex.query(api.products.getBySlug, { slug });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Map product to correct language
    const translatedProduct = {
      ...product,
      id: product._id,
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
