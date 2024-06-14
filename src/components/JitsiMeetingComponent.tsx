// components/JitsiMeetingComponent.js

import React, { useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import axios from 'axios';

const JitsiMeetingComponent = ({ clerkUser }) => {
  useEffect(() => {
    const generateAndJoinMeeting = async () => {
      try {
        if (!clerkUser || !clerkUser.id || !clerkUser.fullName) {
          throw new Error('Invalid clerkUser data');
        }

        const response = await axios.post('/api/generate-jwt', {
          userId: clerkUser.id,
          userName: clerkUser.fullName,
        });

        const { token } = response.data;

        const domain = 'meet.jit.si';
        const roomName = 'YourMeetingRoom';

        const options = {
          roomName,
          jwt: token,
          configOverwrite: {
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: ['microphone', 'camera', 'chat'],
          },
          userInfo: {
            displayName: clerkUser.fullName,
            email: clerkUser.email,
          },
          getIFrameRef: (iframeRef) => {
            iframeRef.style.height = '100%';
          },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);

        return () => {
          api.dispose();
        };
      } catch (error) {
        console.error('Failed to join Jitsi meeting:', error);
      }
    };

    generateAndJoinMeeting();
  }, [clerkUser]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div id="jitsi-container" style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default JitsiMeetingComponent;
