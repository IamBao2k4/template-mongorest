import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTenantPublicService } from '../../customs/tenant-public/Customtenant-public.service';

export class TenantPublicController {
  private service: CustomTenantPublicService;

  constructor() {
    this.service = new CustomTenantPublicService();
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