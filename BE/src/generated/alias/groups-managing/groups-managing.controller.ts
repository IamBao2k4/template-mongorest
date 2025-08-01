import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupsManagingService } from '../../customs/groups-managing/Customgroups-managing.service';

export class GroupsManagingController {
  private service: CustomGroupsManagingService;

  constructor() {
    this.service = new CustomGroupsManagingService();
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