import { FastifyRequest } from 'fastify';
import { CourseTeamService } from '../../alias/course-team/course-team.service'

export class CustomCourseTeamService extends CourseTeamService {

  constructor() {
    super()
  }
}