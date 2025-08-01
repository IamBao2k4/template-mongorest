import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTestApiService } from '../../customs/test-api/Customtest-api.service';

export class TestApiController {
  private service: CustomTestApiService;

  constructor() {
    this.service = new CustomTestApiService();
  }


  // Custom methods can be added here
}