// pages/ConferencePage.js

import VideoConference from '../components/VideoConference';

const ConferencePage = () => {
  const agoraAppId = 'your_agora_app_id';
  const channel = 'your_channel_name';
  const userId = 'user_id_from_clerk_authentication';

  return (
    <div>
      <h1>Video Conference</h1>
      <VideoConference agoraAppId={agoraAppId} channel={channel} userId={userId} />
    </div>
  );
};

export default ConferencePage;
