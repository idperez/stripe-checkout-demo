import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

export async function saveEvent(event: Stripe.Event) {
  const { data, error } = await supabase.from('stripe_events').insert({
    event_id: event.id,
    type: event.type,
    created_at: new Date(event.created * 1000).toISOString(),
    data: event,
  });

  if (error) {
    console.error('Error saving event:', error);
    throw error;
  }

  return data;
}

export async function getEvents() {
  const { data, error } = await supabase
    .from('stripe_events')
    .select('*')
    .order('id', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  console.log(`got data: ${JSON.stringify(data)}`);

  return data;
}
