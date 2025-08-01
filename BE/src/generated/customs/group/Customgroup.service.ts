import { FastifyRequest } from 'fastify';
import { GroupService } from '../../alias/group/group.service'

export class CustomGroupService extends GroupService {

  constructor() {
    super()
  }
}