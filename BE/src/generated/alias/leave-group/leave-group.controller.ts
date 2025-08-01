import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomLeaveGroupService } from '../../customs/leave-group/Customleave-group.service';

export class LeaveGroupController {
  private service: CustomLeaveGroupService;

  constructor() {
    this.service = new CustomLeaveGroupService();
  }




  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.update(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }


  // Custom methods can be added here
}