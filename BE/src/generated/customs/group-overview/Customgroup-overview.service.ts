import { FastifyRequest } from 'fastify';
import { GroupOverviewService } from '../../alias/group-overview/group-overview.service'

export class CustomGroupOverviewService extends GroupOverviewService {

  constructor() {
    super()
  }
}