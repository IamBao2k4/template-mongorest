import { FastifyRequest } from 'fastify';
import { UserTweetCommentedService } from '../../alias/user-tweet-commented/user-tweet-commented.service'

export class CustomUserTweetCommentedService extends UserTweetCommentedService {

  constructor() {
    super()
  }
}