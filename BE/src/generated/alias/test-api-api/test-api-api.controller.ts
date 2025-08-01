import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTestApiApiService } from '../../customs/test-api-api/Customtest-api-api.service';

export class TestApiApiController {
  private service: CustomTestApiApiService;

  constructor() {
    this.service = new CustomTestApiApiService();
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