import { FastifyRequest } from 'fastify';
import { TweetTypeService } from '../../alias/tweet-type/tweet-type.service'

export class CustomTweetTypeService extends TweetTypeService {

  constructor() {
    super()
  }
}