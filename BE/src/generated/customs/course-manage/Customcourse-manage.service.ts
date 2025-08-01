import { FastifyRequest } from 'fastify';
import { CourseManageService } from '../../alias/course-manage/course-manage.service'

export class CustomCourseManageService extends CourseManageService {

  constructor() {
    super()
  }
}