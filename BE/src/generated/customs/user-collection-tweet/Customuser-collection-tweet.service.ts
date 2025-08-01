import { FastifyRequest } from 'fastify';
import { UserCollectionTweetService } from '../../alias/user-collection-tweet/user-collection-tweet.service'

export class CustomUserCollectionTweetService extends UserCollectionTweetService {

  constructor() {
    super()
  }
}