import { FastifyRequest } from 'fastify';
import { LikeService } from '../../alias/like/like.service'

export class CustomLikeService extends LikeService {

  constructor() {
    super()
  }
}