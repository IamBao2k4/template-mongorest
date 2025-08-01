import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupFieldService } from '../../customs/group-field/Customgroup-field.service';

export class GroupFieldController {
  private service: CustomGroupFieldService;

  constructor() {
    this.service = new CustomGroupFieldService();
  }


  // Custom methods can be added here
}