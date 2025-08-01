import { FastifyRequest } from 'fastify';
import { ListingContactService } from '../../alias/listing-contact/listing-contact.service'

export class CustomListingContactService extends ListingContactService {

  constructor() {
    super()
  }
}