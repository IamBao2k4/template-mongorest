import { FastifyInstance } from 'fastify';
import { TweetsGroupDraftController } from './tweets-group-draft.controller';

export async function tweetsGroupDraftRouter(fastify: FastifyInstance) {
  const controller = new TweetsGroupDraftController();

  fastify.post('/tweets-group-draft', controller.create.bind(controller));
  fastify.put('/tweets-group-draft/:id', controller.update.bind(controller));
}