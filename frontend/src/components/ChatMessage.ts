import { ObjectId } from "mongodb";

export type ChatMessage = {
    _id?: ObjectId | string;
    text: string;
    timestamp: string;
  }