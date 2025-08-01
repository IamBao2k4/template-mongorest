import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomChapterService } from '../../customs/chapter/Customchapter.service';

export class ChapterController {
  private service: CustomChapterService;

  constructor() {
    this.service = new CustomChapterService();
  }



  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.create(request);
      reply.code(201).send(result);
    } catch (error) {
      reply.send(error);
    }
  }





  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.update(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }

  async getList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getList(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }








  async delete(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.delete(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }

  // Custom methods can be added here
}