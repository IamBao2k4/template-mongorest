import { FastifyRequest } from 'fastify';
import { GroupReportsService } from '../../alias/group-reports/group-reports.service'

export class CustomGroupReportsService extends GroupReportsService {

  constructor() {
    super()
  }
}