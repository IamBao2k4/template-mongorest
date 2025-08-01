import { FastifyRequest } from 'fastify';
import { CourseCartService } from '../../alias/course-cart/course-cart.service'

export class CustomCourseCartService extends CourseCartService {

  constructor() {
    super()
  }
}