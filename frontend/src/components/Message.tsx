import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MessageProps {
  text: string;
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ text, timestamp }) => {
  return (
    <Card variant="outlined" style={{ margin: '10px' }}>
      <CardContent>
        <Typography variant="body1">{text}</Typography>
        <Typography variant="caption" color="textSecondary" style={{ marginTop: '8px' }}>
          {timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
