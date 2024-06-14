// src/pages/api/events.js

import { getAuth, clerkClient } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const events = await clerkClient.collections.items.list({
        collection: 'events',
      });
      res.status(200).json(events.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body;
      const event = await clerkClient.collections.items.create({
        collection: 'events',
        data: { name, userId },
      });
      res.status(201).json({ message: 'Event saved successfully', event });
    } catch (error) {
      console.error('Error saving event:', error);
      res.status(500).json({ error: 'Failed to save event' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
