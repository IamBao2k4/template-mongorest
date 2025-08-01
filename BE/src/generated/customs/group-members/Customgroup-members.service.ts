import { FastifyRequest } from 'fastify';
import { GroupMembersService } from '../../alias/group-members/group-members.service'

export class CustomGroupMembersService extends GroupMembersService {

  constructor() {
    super()
  }
}