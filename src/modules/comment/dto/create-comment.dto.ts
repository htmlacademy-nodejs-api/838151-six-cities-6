import mongoose from 'mongoose';

export class CreateCommentDto {
  public text: string;
  public offerId: mongoose.Types.ObjectId;
  public userId: mongoose.Types.ObjectId;
}
