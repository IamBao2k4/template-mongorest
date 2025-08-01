import { FastifyRequest } from 'fastify';
import { NoteService } from '../../alias/note/note.service'

export class CustomNoteService extends NoteService {

  constructor() {
    super()
  }
}