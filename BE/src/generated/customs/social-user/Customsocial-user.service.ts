import { FastifyRequest } from 'fastify';
import { SocialUserService } from '../../alias/social-user/social-user.service'

export class CustomSocialUserService extends SocialUserService {

  constructor() {
    super()
  }
}