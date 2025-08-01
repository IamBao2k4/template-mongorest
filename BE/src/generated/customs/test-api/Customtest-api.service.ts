import { FastifyRequest } from 'fastify';
import { TestApiService } from '../../alias/test-api/test-api.service'

export class CustomTestApiService extends TestApiService {

  constructor() {
    super()
  }
}