// pages/api/agora.ts

import https, { RequestOptions } from 'https';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const customerKey = "your_agora_customer_key";
  const customerSecret = "your_agora_customer_secret";

  const plainCredential = `${customerKey}:${customerSecret}`;
  const encodedCredential = Buffer.from(plainCredential).toString('base64');
  const authorizationField = `Basic ${encodedCredential}`;

  const options: RequestOptions = {
    hostname: 'api.agora.io',
    port: 443,
    path: '/dev/v1/projects',
    method: 'GET',
    headers: {
      'Authorization': authorizationField,
      'Content-Type': 'application/json'
    }
  };

  const apiRequest = new Promise<void>((resolve, reject) => {
    const req = https.request(options, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.end();
  });

  try {
    await apiRequest;
    res.status(200).json({ message: 'Successfully fetched data from Agora API' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Agora API' });
  }
}
