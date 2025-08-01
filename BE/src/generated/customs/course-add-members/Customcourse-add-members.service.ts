import { FastifyRequest } from 'fastify';
import { CourseAddMembersService } from '../../alias/course-add-members/course-add-members.service'

export class CustomCourseAddMembersService extends CourseAddMembersService {

  constructor() {
    super()
  }
}