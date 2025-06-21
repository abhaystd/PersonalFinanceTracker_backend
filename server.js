// backend/server.js
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

require('mongoose').connect(MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
