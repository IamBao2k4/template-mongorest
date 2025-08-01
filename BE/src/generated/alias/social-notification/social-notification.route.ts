import { FastifyInstance } from 'fastify';
import { SocialNotificationController } from './social-notification.controller';

export async function socialNotificationRouter(fastify: FastifyInstance) {
  const controller = new SocialNotificationController();

  fastify.get('/list/social-notification', controller.getList.bind(controller));
  fastify.put('/social-notification/:id', controller.update.bind(controller));
  fastify.delete('/social-notification/:id', controller.delete.bind(controller));
}