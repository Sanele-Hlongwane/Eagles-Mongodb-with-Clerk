// ParentComponent.js

import React, { useState, useEffect } from 'react';
import JitsiMeetingComponent from './JitsiMeetingComponent';
import axios from 'axios';

const ParentComponent = () => {
  const [clerkUser, setClerkUser] = useState(null);

  useEffect(() => {
    // Example of fetching clerkUser asynchronously
    const fetchClerkUser = async () => {
      try {
        const response = await axios.get('/api/get-user'); // Example API endpoint
        setClerkUser(response.data); // Assuming response.data is the user object
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchClerkUser();
  }, []);

  return (
    <div>
      <h1>Parent Component</h1>
      {clerkUser ? (
        <JitsiMeetingComponent clerkUser={clerkUser} />
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ParentComponent;
