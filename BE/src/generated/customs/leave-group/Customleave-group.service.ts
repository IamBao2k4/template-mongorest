import { FastifyRequest } from 'fastify';
import { LeaveGroupService } from '../../alias/leave-group/leave-group.service'

export class CustomLeaveGroupService extends LeaveGroupService {

  constructor() {
    super()
  }
}