import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { UserType } from '../../types/user-type.enum.js';
import { Types } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, default: '' })
  public name: string;

  @prop({ required: false, default: '' })
  public avatar?: string;

  @prop({ required: true, default: '' })
  private password?: string;

  @prop({ required: true, default: UserType.Normal })
  public userType: UserType;

  @prop({
    required: true,
    default: [],
    type: [Types.ObjectId],
    ref: 'Offer',
  })
  public favorites: Types.ObjectId[];

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.avatar = userData.avatar;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
