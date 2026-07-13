const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db');

require('./models/Registration');

const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();


app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Event Registration System API');
});

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();  
