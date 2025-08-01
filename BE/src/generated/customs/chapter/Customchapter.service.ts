import { FastifyRequest } from 'fastify';
import { ChapterService } from '../../alias/chapter/chapter.service'

export class CustomChapterService extends ChapterService {

  constructor() {
    super()
  }
}