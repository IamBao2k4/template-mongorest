import { FastifyInstance } from 'fastify';
import { SocialRegisterEventController } from './social-register-event.controller';

export async function socialRegisterEventRouter(fastify: FastifyInstance) {
  const controller = new SocialRegisterEventController();

  fastify.post('/social-register-event', controller.create.bind(controller));
  fastify.delete('/social-register-event/:id', controller.delete.bind(controller));
}