import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomAreaService } from '../../customs/area/Customarea.service';

export class AreaController {
  private service: CustomAreaService;

  constructor() {
    this.service = new CustomAreaService();
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