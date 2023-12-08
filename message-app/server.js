const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app); 
const io = socketIo(server); 

const PORT = 8000;

app.use(cors());
app.use(express.json());

const mongoURL = 'mongodb+srv://adithi:yUSzG8GMRLcM3KVy@messageboard.ibnn7wn.mongodb.net/boards?retryWrites=true&w=majority';

io.on('connection', (socket) => {
  console.log('A user connected');
});

app.get('/messages', async (req, res) => {
  try {
    const mongoClient = new MongoClient(mongoURL);
    await mongoClient.connect();
    const messages = await mongoClient.db('boards').collection('messages').find({}).toArray();
    await mongoClient.close();

    console.log(messages);
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/newMessage', async (req, res) => {
  try {
    const { comment } = req.body;
    const timestamp = new Date().toLocaleString();

    const mongoClient = new MongoClient(mongoURL);
    await mongoClient.connect();

    await mongoClient.db('boards').collection('messages').insertOne({
      comment,
      timestamp,
    });

    await mongoClient.close();

    io.emit('message', { comment, timestamp });

    res.status(201).json({ message: 'Message added successfully' });
  } catch (error) {
    console.error('Error adding message to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:8000`);
});
