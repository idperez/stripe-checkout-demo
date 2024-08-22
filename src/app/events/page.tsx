import { getEvents } from '@/lib/eventStorage';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold mb-6">Stripe Events</h1>
      {events.length === 0 ? (
        <p>No events received yet. Trigger some events and refresh the page.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.type}</h2>
              <p className="text-gray-600">ID: {event.id}</p>
              <p className="text-gray-600">Created: {new Date(event.created).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
