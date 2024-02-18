import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { now } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 5, maxlength: 1024 })
  public text: string;

  @prop({ required: true, default: now })
  public publicationDate: Date;

  @prop({ required: true, default: 1, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true, default: '' })
  public author: string;
}

export const CommentModel = getModelForClass(CommentEntity);
