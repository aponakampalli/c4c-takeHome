import { ObjectId } from "mongodb";

export type ChatMessage = {
    _id?: ObjectId | string;
    comment: string;
    timestamp: string;
  }