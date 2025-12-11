const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');


const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const forumRoutes = require('./routes/forumRoutes')


const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());

console.log('mongo uri:', process.env.MONGO_URI);

// ✅ Connect to MongoDB with Mongoose
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('MongoDB Connected successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err.message));

// Routes
app.use('/user', userRoutes);
app.use('/email', emailRoutes);
app.use('/questionnaire', questionnaireRoutes);
app.use('/api/forum', forumRoutes)


app.use('/public', express.static(path.join(__dirname, 'public')));

// Start server


app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
});

module.exports = app;