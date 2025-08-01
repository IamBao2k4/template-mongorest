import { FastifyRequest } from 'fastify';
import { GroupMemberApprovedService } from '../../alias/group-member-approved/group-member-approved.service'

export class CustomGroupMemberApprovedService extends GroupMemberApprovedService {

  constructor() {
    super()
  }
}