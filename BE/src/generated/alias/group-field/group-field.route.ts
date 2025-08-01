import { FastifyInstance } from 'fastify';
import { GroupFieldController } from './group-field.controller';

export async function groupFieldRouter(fastify: FastifyInstance) {
  const controller = new GroupFieldController();

}