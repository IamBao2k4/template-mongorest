import { FastifyRequest } from 'fastify';
import { UserTweetSavedService } from '../../alias/user-tweet-saved/user-tweet-saved.service'

export class CustomUserTweetSavedService extends UserTweetSavedService {

  constructor() {
    super()
  }
}