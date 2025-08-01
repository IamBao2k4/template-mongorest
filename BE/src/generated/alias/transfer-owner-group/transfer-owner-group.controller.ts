import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTransferOwnerGroupService } from '../../customs/transfer-owner-group/Customtransfer-owner-group.service';

export class TransferOwnerGroupController {
  private service: CustomTransferOwnerGroupService;

  constructor() {
    this.service = new CustomTransferOwnerGroupService();
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