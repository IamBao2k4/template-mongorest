import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTweetsGroupService } from '../../customs/tweets-group/Customtweets-group.service';

export class TweetsGroupController {
  private service: CustomTweetsGroupService;

  constructor() {
    this.service = new CustomTweetsGroupService();
  }

  async getList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getList(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }





  async getDetail(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getDetail(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
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