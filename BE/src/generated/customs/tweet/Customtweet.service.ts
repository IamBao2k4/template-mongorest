import { FastifyRequest } from 'fastify';
import { TweetService } from '../../alias/tweet/tweet.service'

export class CustomTweetService extends TweetService {

  constructor() {
    super()
  }
}