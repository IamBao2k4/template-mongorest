import { FastifyRequest } from 'fastify';
import { CommentItemService } from '../../alias/comment-item/comment-item.service'

export class CustomCommentItemService extends CommentItemService {

  constructor() {
    super()
  }
}