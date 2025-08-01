import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupMediaService } from '../../customs/group-media/Customgroup-media.service';

export class GroupMediaController {
  private service: CustomGroupMediaService;

  constructor() {
    this.service = new CustomGroupMediaService();
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