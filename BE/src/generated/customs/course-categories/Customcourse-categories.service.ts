import { FastifyRequest } from 'fastify';
import { CourseCategoriesService } from '../../alias/course-categories/course-categories.service'

export class CustomCourseCategoriesService extends CourseCategoriesService {

  constructor() {
    super()
  }
}