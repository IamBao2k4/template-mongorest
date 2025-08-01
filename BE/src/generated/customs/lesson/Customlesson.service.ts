import { FastifyRequest } from 'fastify';
import { LessonService } from '../../alias/lesson/lesson.service'

export class CustomLessonService extends LessonService {

  constructor() {
    super()
  }
}