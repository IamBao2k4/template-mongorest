import { FastifyRequest } from 'fastify';
import { TweetsService } from '../../alias/tweets/tweets.service'

export class CustomTweetsService extends TweetsService {

  constructor() {
    super()
  }
}