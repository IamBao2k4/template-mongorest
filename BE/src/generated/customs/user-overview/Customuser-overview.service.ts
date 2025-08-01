import { FastifyRequest } from 'fastify';
import { UserOverviewService } from '../../alias/user-overview/user-overview.service'

export class CustomUserOverviewService extends UserOverviewService {

  constructor() {
    super()
  }
}