import { FastifyRequest } from 'fastify';
import { TweetApprovedService } from '../../alias/tweet-approved/tweet-approved.service'

export class CustomTweetApprovedService extends TweetApprovedService {

  constructor() {
    super()
  }
}