import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserProgressService } from '../../customs/user-progress/Customuser-progress.service';

export class UserProgressController {
  private service: CustomUserProgressService;

  constructor() {
    this.service = new CustomUserProgressService();
  }



  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.create(request);
      reply.code(201).send(result);
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