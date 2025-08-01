import { FastifyRequest } from 'fastify';
import { CourseUserStatisticService } from '../../alias/course-user-statistic/course-user-statistic.service'

export class CustomCourseUserStatisticService extends CourseUserStatisticService {

  constructor() {
    super()
  }
}