// server/auth-api.js

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Replace this with your actual secret key for JWT signing
const JWT_SECRET = 'your_jwt_secret_key';

app.use(express.json());

// Endpoint to generate JWT token
app.post('/api/generate-jwt', (req, res) => {
  const { userId, userName } = req.body; // Assuming userId and userName are obtained from your authentication system

  // Example of generating JWT token with user information
  const token = jwt.sign({
    iss: 'your_app_name', // Issuer (your application)
    sub: userId, // Subject (user id)
    room: '*', // Can be a specific room name or '*' for any room
    aud: 'meet.jit.si', // Audience (Jitsi Meet domain)
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // Expires in 1 hour
    context: {
      user: {
        name: userName,
        email: 'user@example.com', // Optionally include user email
      }
    }
  }, JWT_SECRET);

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
