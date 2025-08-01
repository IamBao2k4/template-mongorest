import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserService } from '../../customs/user/Customuser.service';

export class UserController {
  private service: CustomUserService;

  constructor() {
    this.service = new CustomUserService();
  }







  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.create(request);
      reply.code(201).send(result);
    } catch (error) {
      reply.send(error);
    }
  }



  // Custom methods can be added here
}