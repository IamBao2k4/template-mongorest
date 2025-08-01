import { FastifyRequest } from 'fastify';
import { ListingUserTweetService } from '../../alias/listing-user-tweet/listing-user-tweet.service'

export class CustomListingUserTweetService extends ListingUserTweetService {

  constructor() {
    super()
  }
}