// src/components/MessageBoard.tsx
import React, { useState } from 'react';
import Message from './Message';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

interface ChatMessage {
  text: string;
  timestamp: string;
}

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getCurrentTimestamp = (): string => {
    const now = new Date();
    return now.toLocaleString(); // Customize the timestamp format as needed
  };

  const handleAddMessage = () => {
    const trimmedMessage = newMessage.trim();

    if (trimmedMessage === '') {
      setErrorMessage('Message cannot be empty.');
    } else if (trimmedMessage.length > 128) {
      setErrorMessage('Message cannot exceed 128 characters.');
    } else {
      const timestamp = getCurrentTimestamp();
      const newChatMessage: ChatMessage = { text: trimmedMessage, timestamp };
      setMessages([newChatMessage, ...messages]);
      setNewMessage('');
      setErrorMessage('');
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
        {messages.map((message, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Message text={message.text} timestamp={message.timestamp} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MessageBoard;
