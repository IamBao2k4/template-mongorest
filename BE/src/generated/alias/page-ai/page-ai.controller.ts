import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomPageAiService } from '../../customs/page-ai/Custompage-ai.service';

export class PageAiController {
  private service: CustomPageAiService;

  constructor() {
    this.service = new CustomPageAiService();
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