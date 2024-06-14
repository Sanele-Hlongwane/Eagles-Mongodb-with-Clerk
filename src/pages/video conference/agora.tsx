import * as https from 'https';

function makeAgoraApiRequest() {
  const customerKey = "812b69f9376b4149a3217aa38624ba9a";
  const customerSecret = "86a3afdf3eee417a9d37e26462a92f22";

  const plainCredential = customerKey + ":" + customerSecret;
  const encodedCredential = Buffer.from(plainCredential).toString('base64');
  const authorizationField = "Basic " + encodedCredential;

  const options = {
    hostname: 'api.agora.io',
    port: 443,
    path: '/dev/v1/projects',
    method: 'GET',
    headers: {
      'Authorization': authorizationField,
      'Content-Type': 'application/json'
    }
  };

 

  const req = https.request(options, (res: https.IncomingMessage) => {
    let data = '';

    // Handle data received from the response
    res.on('data', (chunk: Buffer) => {
      data += chunk.toString();
    });

    // Handle end of response
    res.on('end', () => {
      console.log(`Status code: ${res.statusCode}`);
      console.log('Response body:', data);
    });
  });

  // Handle errors that may occur during the request
  req.on('error', (error: Error) => {
    console.error('Request error:', error);
  });

  req.end();
}

makeAgoraApiRequest();
