import { FastifyRequest } from 'fastify';
import { CourseDepartmentService } from '../../alias/course-department/course-department.service'

export class CustomCourseDepartmentService extends CourseDepartmentService {

  constructor() {
    super()
  }
}