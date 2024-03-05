import { Expose, Transform } from 'class-transformer';
import { UserType } from '../../../types/user-type.enum.js';
import mongoose from 'mongoose';

export class UserRdo {
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
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public avatar: string;

  @Expose()
  public userType: UserType;
}
