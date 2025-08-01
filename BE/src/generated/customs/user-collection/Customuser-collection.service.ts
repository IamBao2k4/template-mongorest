import { FastifyRequest } from 'fastify';
import { UserCollectionService } from '../../alias/user-collection/user-collection.service'

export class CustomUserCollectionService extends UserCollectionService {

  constructor() {
    super()
  }
}