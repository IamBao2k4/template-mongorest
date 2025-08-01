import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupsPublicService } from '../../customs/groups-public/Customgroups-public.service';

export class GroupsPublicController {
  private service: CustomGroupsPublicService;

  constructor() {
    this.service = new CustomGroupsPublicService();
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