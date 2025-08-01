import { FastifyRequest } from 'fastify';
import { CourseStatisticService } from '../../alias/course-statistic/course-statistic.service'

export class CustomCourseStatisticService extends CourseStatisticService {

  constructor() {
    super()
  }
}