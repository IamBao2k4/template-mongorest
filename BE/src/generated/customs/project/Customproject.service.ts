import { FastifyRequest } from 'fastify';
import { ProjectService } from '../../alias/project/project.service'

export class CustomProjectService extends ProjectService {

  constructor() {
    super()
  }
}