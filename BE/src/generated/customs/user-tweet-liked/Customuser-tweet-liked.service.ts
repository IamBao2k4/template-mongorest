import { FastifyRequest } from 'fastify';
import { UserTweetLikedService } from '../../alias/user-tweet-liked/user-tweet-liked.service'

export class CustomUserTweetLikedService extends UserTweetLikedService {

  constructor() {
    super()
  }
}