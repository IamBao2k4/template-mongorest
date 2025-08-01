import { FastifyRequest } from 'fastify';
import { TestApiApiService } from '../../alias/test-api-api/test-api-api.service'

export class CustomTestApiApiService extends TestApiApiService {

  constructor() {
    super()
  }
}