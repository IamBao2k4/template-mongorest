import { FastifyRequest } from 'fastify';
import { CategoryService } from '../../alias/category/category.service'

export class CustomCategoryService extends CategoryService {

  constructor() {
    super()
  }
}