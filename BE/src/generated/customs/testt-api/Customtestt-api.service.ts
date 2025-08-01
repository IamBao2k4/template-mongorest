import { FastifyRequest } from 'fastify';
import { TesttApiService } from '../../alias/testt-api/testt-api.service'

export class CustomTesttApiService extends TesttApiService {

  constructor() {
    super()
  }
}