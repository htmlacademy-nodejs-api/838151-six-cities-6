import { ObjectId } from 'mongoose';

export type Comment = {
  text: string;
  rating: number;
  userId: ObjectId;
  offerId: ObjectId;
};
