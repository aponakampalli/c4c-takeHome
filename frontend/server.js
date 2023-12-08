const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');
const { MongoClient } = require('mongodb');

app.use(cors());
app.use(express.json());


const mongoURL = 'mongodb+srv://adithi:yUSzG8GMRLcM3KVy@messageboard.ibnn7wn.mongodb.net/messageBoard?retryWrites=true&w=majority';

app.get('/messages', async (req, res) => {
  try {
    const mongoClient = new MongoClient(mongoURL);
    await mongoClient.connect();
    const messages = mongoClient.db().collection('messageBoard').find({});

    res.json({ messages }); 
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});