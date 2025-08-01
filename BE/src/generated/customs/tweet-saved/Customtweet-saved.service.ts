import { FastifyRequest } from 'fastify';
import { TweetSavedService } from '../../alias/tweet-saved/tweet-saved.service'

export class CustomTweetSavedService extends TweetSavedService {

  constructor() {
    super()
  }
}