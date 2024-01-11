import {UserType} from './user.types.js';

export type CommentType = {
  text: string;
  publicationDate: string;
  rating: number;
  author: UserType;
};
