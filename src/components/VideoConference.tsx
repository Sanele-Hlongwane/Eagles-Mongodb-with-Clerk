// components/VideoConference.tsx

import React, { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk'; // Ensure correct import

interface VideoConferenceProps {
  agoraAppId: string;
  channel: string;
}

const VideoConference: React.FC<VideoConferenceProps> = ({ agoraAppId, channel }) => {
  const localVideo = useRef<HTMLDivElement>(null);
  const remoteVideo = useRef<HTMLDivElement>(null);
  let client: any = null;
  let localStream: any = null; // Adjust this type as per AgoraRTC documentation

  useEffect(() => {
    // Create a client instance
    client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });

    // Initialize AgoraRTC with your appId
    client.init(agoraAppId, () => {
      console.log('AgoraRTC client initialized');

      // Join the channel
      client.join(null, channel, null, (uid: number) => {
        console.log('User ' + uid + ' joined channel ' + channel);

        // Create local stream
        localStream = AgoraRTC.createStream({
          video: true,
          audio: true,
        });

        // Initialize local stream
        localStream.init(() => {
          console.log('Local stream initialized and playing');

          if (localVideo.current) {
            localStream.play(localVideo.current); // Play local video stream
            client.publish(localStream); // Publish local stream

            // Subscribe to remote stream added
            client.on('stream-added', (evt: any) => {
              client.subscribe(evt.stream); // Subscribe to remote stream
            });

            // Subscribe to remote stream subscribed
            client.on('stream-subscribed', (evt: any) => {
              if (remoteVideo.current) {
                evt.stream.play(remoteVideo.current); // Play remote stream
              }
            });
          }
        });
      });
    });

    return () => {
      if (client) {
        client.leave(); // Leave the channel on component unmount
        client = null; // Clear client instance
      }

      if (localStream) {
        localStream.close(); // Close the local stream on component unmount
        localStream = null; // Clear localStream instance
      }
    };
  }, [agoraAppId, channel]);

  return (
    <div>
      <div ref={localVideo}></div>
      <div ref={remoteVideo}></div>
    </div>
  );
};

export default VideoConference;
