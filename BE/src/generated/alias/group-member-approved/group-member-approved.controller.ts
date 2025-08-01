import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupMemberApprovedService } from '../../customs/group-member-approved/Customgroup-member-approved.service';

export class GroupMemberApprovedController {
  private service: CustomGroupMemberApprovedService;

  constructor() {
    this.service = new CustomGroupMemberApprovedService();
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