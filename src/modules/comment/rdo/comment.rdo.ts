import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import mongoose from 'mongoose';

export class CommentRdo {
  @Expose({ name: '_id' })
  @Transform((value) => {
    if ('value' in value) {
      return value.value instanceof mongoose.Types.ObjectId
        ? value.obj._id.toHexString()
        : value.obj._id.toString();
    }

    return 'unknown value';
  })
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose({ name: 'createdAt' })
  public date: string;
}
