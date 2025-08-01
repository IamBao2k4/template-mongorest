import { FastifyRequest } from 'fastify';
import { GroupsJoinedService } from '../../alias/groups-joined/groups-joined.service'

export class CustomGroupsJoinedService extends GroupsJoinedService {

  constructor() {
    super()
  }
}