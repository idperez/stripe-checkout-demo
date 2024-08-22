import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { saveEvent } from '@/lib/eventStorage';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

  await saveEvent(event);
  console.log(`Received and saved event: ${event.type}`);

  return NextResponse.json({ received: true });
}
