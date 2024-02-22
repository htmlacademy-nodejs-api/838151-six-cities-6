import { Expose } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose()
  public rating: number;

  @Expose()
  public userId: ObjectId;

  @Expose()
  public createdAt: Date;
}
