import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupService } from '../../customs/group/Customgroup.service';

export class GroupController {
  private service: CustomGroupService;

  constructor() {
    this.service = new CustomGroupService();
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


  async getDetail(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getDetail(request);
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





  // Custom methods can be added here
}