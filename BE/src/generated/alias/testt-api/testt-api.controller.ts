import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTesttApiService } from '../../customs/testt-api/Customtestt-api.service';

export class TesttApiController {
  private service: CustomTesttApiService;

  constructor() {
    this.service = new CustomTesttApiService();
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