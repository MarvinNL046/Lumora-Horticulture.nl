'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  brand: string;
  availability: string;
}

export default function ShopPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'nl';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-lumora-dark mb-4">
            Webshop
          </h1>
          <p className="text-xl text-lumora-dark/70">
            Professionele kweekoplossingen voor optimale resultaten
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-soft-lg overflow-hidden hover:shadow-soft-md transition-all duration-300 border border-lumora-dark/10"
            >
              {/* Product Image */}
              <div className="relative aspect-w-16 aspect-h-9 bg-lumora-cream/20">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                  }}
                />
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium shadow-soft ${
                      product.availability === 'in stock'
                        ? 'bg-lumora-green-500 text-white'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.availability === 'in stock' ? 'Op voorraad' : 'Niet beschikbaar'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h2 className="text-2xl font-display font-bold text-lumora-dark mb-3">
                  {product.name}
                </h2>
                <p className="text-lumora-dark/70 mb-6 leading-relaxed">{product.description}</p>

                {/* Price & CTA */}
                <div className="flex justify-between items-center pt-4 border-t border-lumora-dark/10">
                  <div className="text-3xl font-bold text-lumora-green-500">
                    €{parseFloat(product.price).toFixed(2)}
                  </div>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="bg-lumora-green-500 text-white px-6 py-3 rounded-xl hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md font-medium"
                  >
                    Bekijk product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
