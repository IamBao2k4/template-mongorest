import { FastifyRequest } from 'fastify';
import { TweetRelativeService } from '../../alias/tweet-relative/tweet-relative.service'

export class CustomTweetRelativeService extends TweetRelativeService {

  constructor() {
    super()
  }
}