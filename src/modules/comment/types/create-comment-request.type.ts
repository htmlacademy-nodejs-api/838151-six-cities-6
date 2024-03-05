import { Request } from 'express';
import { CreateCommentDto } from '../dto/create-comment.dto.js';
import { ParamOfferId } from '../../offer/type/param-offerid.type.js';

export type CreateCommentRequest = Request<ParamOfferId, unknown, CreateCommentDto>;
