import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MessageProps {
  comment: string;
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ comment, timestamp }) => {
  return (
    <Card variant="outlined" style={{ margin: '10px' }}>
      <CardContent>
        <Typography variant="body1">{comment}</Typography>
        <Typography variant="caption" color="textSecondary" style={{ marginTop: '8px' }}>
          {timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
