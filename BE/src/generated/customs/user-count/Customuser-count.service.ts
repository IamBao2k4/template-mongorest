import { FastifyRequest } from 'fastify';
import { UserCountService } from '../../alias/user-count/user-count.service'

export class CustomUserCountService extends UserCountService {

  constructor() {
    super()
  }
}