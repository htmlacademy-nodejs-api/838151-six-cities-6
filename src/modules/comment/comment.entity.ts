import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { now } from 'mongoose';
import { Comment } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps implements Comment {
  @prop({ required: true, minlength: 5, maxlength: 1024 })
  public text: string;

  @prop({ required: true, default: now })
  public publicationDate: string;

  @prop({ required: true, default: 1, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true, default: '' })
  public author: string;

  constructor(commentData: Comment) {
    super();

    this.text = commentData.text;
    this.publicationDate = commentData.publicationDate;
    this.rating = commentData.rating;
    this.author = commentData.author;
  }
}

export const CommentModel = getModelForClass(CommentEntity);
