import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupsJoinedService } from '../../customs/groups-joined/Customgroups-joined.service';

export class GroupsJoinedController {
  private service: CustomGroupsJoinedService;

  constructor() {
    this.service = new CustomGroupsJoinedService();
  }

  async getList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getList(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }





  // Custom methods can be added here
}