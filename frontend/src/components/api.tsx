import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb';
import { ChatMessage } from './ChatMessage';

type Props = {
  messages: ChatMessage[];
};

const getMSProps = async () => {
  try {
    const mongoClient = new MongoClient('mongodb+srv://<username>:<password>@messageboard.ibnn7wn.mongodb.net/messageBoard?retryWrites=true&w=majority');

    await mongoClient.connect();

    const mongoData = await mongoClient
      .db()
      .collection('messageBoard')
      .find({ /* Add a filter if needed */ })
      .toArray();

    const apiResult = await axios.get<{
      messages: ChatMessage[];
    }>('http://localhost:8000/messages');

    return {
      props: {
        messages: {
          users: apiResult.data.messages
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        messages: [],
      },
      revalidate: 60,
    };
  }
};

export default getMSProps;
