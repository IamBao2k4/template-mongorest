import { FastifyRequest } from 'fastify';
import { GroupCategoriesService } from '../../alias/group-categories/group-categories.service'

export class CustomGroupCategoriesService extends GroupCategoriesService {

  constructor() {
    super()
  }
}