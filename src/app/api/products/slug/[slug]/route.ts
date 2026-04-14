import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';

export const dynamic = 'force-dynamic';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'nl';

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
