import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import mongoose, { ObjectId } from 'mongoose';
import { UserEntity } from '../user/index.js';

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
  public comment!: string;

  @prop({ required: true, default: 1, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, type: mongoose.Types.ObjectId, ref: 'offers' })
  public offerId!: ObjectId;

  @prop({ required: true, type: mongoose.Types.ObjectId, ref: UserEntity })
  public userId!: ObjectId;
}

export const CommentModel = getModelForClass(CommentEntity);
