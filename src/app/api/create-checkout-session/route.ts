import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/data/products';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { productId } = await request.json();

    // Find the product in our "database"
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.imageUrl],
            },
            unit_amount: product.price, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      custom_fields: [
        {
          'key': 'customer_notes',
          'label': {
            'type': 'custom',
            'custom': 'Notes for your order'
          },
          'type': 'text',
        },
      ]
    });

    // Return the session ID
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Error in create-checkout-session:', err);
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
