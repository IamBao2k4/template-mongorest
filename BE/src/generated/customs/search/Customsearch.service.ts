import { FastifyRequest } from 'fastify';
import { SearchService } from '../../alias/search/search.service'

export class CustomSearchService extends SearchService {

  constructor() {
    super()
  }
}