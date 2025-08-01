import { FastifyRequest } from 'fastify';
import { ListingTweetService } from '../../alias/listing-tweet/listing-tweet.service'

export class CustomListingTweetService extends ListingTweetService {

  constructor() {
    super()
  }
}