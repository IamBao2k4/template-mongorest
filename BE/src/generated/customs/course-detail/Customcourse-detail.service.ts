import { FastifyRequest } from 'fastify';
import { CourseDetailService } from '../../alias/course-detail/course-detail.service'

export class CustomCourseDetailService extends CourseDetailService {

  constructor() {
    super()
  }
}