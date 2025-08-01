import { FastifyRequest } from 'fastify';
import { GroupsManagingService } from '../../alias/groups-managing/groups-managing.service'

export class CustomGroupsManagingService extends GroupsManagingService {

  constructor() {
    super()
  }
}