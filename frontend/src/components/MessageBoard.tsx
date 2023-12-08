// src/components/MessageBoard.tsx
import React, { useEffect, useState } from 'react';
import Message from './Message';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { io } from 'socket.io-client';

interface MessageData {
  _id: string;
  name: string;
  comment: string;
  timestamp: string; // Assuming the timestamp is a string
}

interface MessagesResponse {
  messages: MessageData[];
}

const socket = io('http://127.0.0.1:8000');

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<MessagesResponse>({ messages: [] });
  const [newMessage, setNewMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getCurrentTimestamp = (): string => {
    const now = new Date();
    return now.toLocaleString(); // You can customize the format as needed
  };

  const fetchData = async () => {
    try {
      const response: AxiosResponse<MessagesResponse> = await axios.get(`http://127.0.0.1:8000/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
  socket.on('message', (data: MessageData) => {
    setMessages((prevMessages) => ({
      messages: [...prevMessages.messages, data],
    }));
  });

  const handleAddMessage = async () => {
    const trimmedMessage = newMessage.trim();

    if (trimmedMessage === '') {
      setErrorMessage('Message cannot be empty.');
    } else if (trimmedMessage.length > 128) {
      setErrorMessage('Message cannot exceed 128 characters.');
    } else {
      try {
        const timestamp = getCurrentTimestamp();

        await axios.post('http://127.0.0.1:8000/newMessage', {
          comment: trimmedMessage,
          timestamp: timestamp,
        });
        fetchData();
        setNewMessage('');
        setErrorMessage('');
      } catch (error) {
        console.error('Error adding message:', error);
        setErrorMessage('Error adding message. Please try again.');
      }
    }
  };

  return (
    <Container style={{ maxWidth: '70%', margin: 'auto' }}>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: '20px' }}>
        <Grid item xs={10}>
          <TextField
            label="New Message"
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            error={!!errorMessage}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={handleAddMessage} fullWidth>
            Send
          </Button>
        </Grid>
      </Grid>
      {errorMessage && (
        <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
          {errorMessage}
        </Typography>
      )}
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        {messages.messages.slice().reverse().map((each, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Message comment={each.comment} timestamp={each.timestamp} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MessageBoard;
