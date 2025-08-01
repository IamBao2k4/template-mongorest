import { FastifyRequest } from 'fastify';
import { CategoriesService } from '../../alias/categories/categories.service'

export class CustomCategoriesService extends CategoriesService {

  constructor() {
    super()
  }
}