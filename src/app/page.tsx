'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckout = async (product: Product) => {
    setLoading(true);
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: product.id }),
    });

    const { id: sessionId } = await response.json();

    const stripe = await stripePromise;

    if (!stripe) throw new Error('Stripe failed to initialize.');

    await stripe.redirectToCheckout({ sessionId });

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <h1 className="text-4xl font-bold mb-8">Stripe Checkout Example</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">${(product.price / 100).toFixed(2)}</p>
            <button
              onClick={() => handleCheckout(product)}
              disabled={loading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {loading ? 'Processing...' : `Buy ${product.name}`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
