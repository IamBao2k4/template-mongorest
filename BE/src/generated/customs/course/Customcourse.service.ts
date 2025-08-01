import { FastifyRequest } from 'fastify';
import { CourseService } from '../../alias/course/course.service'

export class CustomCourseService extends CourseService {

  constructor() {
    super()
  }
}