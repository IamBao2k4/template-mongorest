import { FastifyRequest } from 'fastify';
import { CourseMemberService } from '../../alias/course-member/course-member.service'

export class CustomCourseMemberService extends CourseMemberService {

  constructor() {
    super()
  }
}