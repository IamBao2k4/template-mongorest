import { FastifyRequest } from 'fastify';
import { TweetPinService } from '../../alias/tweet-pin/tweet-pin.service'

export class CustomTweetPinService extends TweetPinService {

  constructor() {
    super()
  }
}