import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomAllEntitesService } from '../../customs/all-entites/Customall-entites.service';

export class AllEntitesController {
  private service: CustomAllEntitesService;

  constructor() {
    this.service = new CustomAllEntitesService();
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