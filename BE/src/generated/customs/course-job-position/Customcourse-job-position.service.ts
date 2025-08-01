import { FastifyRequest } from 'fastify';
import { CourseJobPositionService } from '../../alias/course-job-position/course-job-position.service'

export class CustomCourseJobPositionService extends CourseJobPositionService {

  constructor() {
    super()
  }
}