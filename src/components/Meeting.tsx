// pages/index.js

import React from 'react';
import JitsiMeetingComponent from '../components/JitsiMeetingComponent';
import { clerkMiddleware } from "@clerk/nextjs/server";

const IndexPage = ({ clerkUser }) => {
  return (
    <div>
      <h1>Welcome to Jitsi Meeting</h1>
      <JitsiMeetingComponent clerkUser={clerkUser} />
    </div>
  );
};

export default IndexPage;

// Apply clerkMiddleware if necessary
IndexPage.middleware = clerkMiddleware;
