import { FastifyInstance } from 'fastify';
import { NoteController } from './note.controller';

export async function noteRouter(fastify: FastifyInstance) {
  const controller = new NoteController();

  fastify.post('/note', controller.create.bind(controller));
  fastify.get('/list/note', controller.getList.bind(controller));
  fastify.put('/note/:id', controller.update.bind(controller));
  fastify.delete('/note/:id', controller.delete.bind(controller));
}