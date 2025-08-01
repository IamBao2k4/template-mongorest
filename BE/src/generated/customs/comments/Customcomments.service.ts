import { FastifyRequest } from 'fastify';
import { CommentsService } from '../../alias/comments/comments.service'

export class CustomCommentsService extends CommentsService {

  constructor() {
    super()
  }
}