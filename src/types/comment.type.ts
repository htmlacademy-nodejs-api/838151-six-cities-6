import { User } from './user.type.js';

export type CommentType = {
  text: string;
  publicationDate: string;
  rating: number;
  author: User;
};
