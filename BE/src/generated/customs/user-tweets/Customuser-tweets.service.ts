import { FastifyRequest } from 'fastify';
import { UserTweetsService } from '../../alias/user-tweets/user-tweets.service'

export class CustomUserTweetsService extends UserTweetsService {

  constructor() {
    super()
  }
}