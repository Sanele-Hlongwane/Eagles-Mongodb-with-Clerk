// src/pages/events.js

import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import styles from './events.module.css';
import axios from 'axios';

type Event = {
  id: string;
  name: string;
};

export default function Events() {
  const { user } = useUser();
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const saveEvent = async () => {
    try {
      await axios.post('/api/events', { name: eventName });
      setEventName('');
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div className={styles.container}>
      <SignedIn>
        <Image src="/images/EaglesRingLogo.png" alt="Eagles Ring Logo" height={22} width={100} />
        {user ? (
          <p>Welcome, {user.fullName || user.firstName || 'User'}! You are signed in.</p>
        ) : (
          <p>Loading user information...</p>
        )}
        <div>
          <input
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className={styles.inputField}
          />
          <button onClick={saveEvent} className={styles.button}>Save Event</button>
        </div>
        <div>
          <h2>Events</h2>
          <ul className={styles.eventsList}>
            {events.map((event) => (
              <li key={event.id}>{event.name}</li>
            ))}
          </ul>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
