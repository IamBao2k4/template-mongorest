// APPROACH 3: Direct Passport.js wrapper - Most reliable approach
import { FastifyInstance } from 'fastify';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AuthService } from '../auth.service';

export const createDirectPassportPlugin = (authService: AuthService) => {
  return async (fastify: FastifyInstance) => {
    // Configure Local Strategy
    passport.use('local', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, async (email: string, password: string, done: Function) => {
      try {
        console.log('Direct Passport Local Strategy - validating:', email);
        
        const user = await authService.validateCredentials(email, password);
        
        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        
        return done(null, user);
      } catch (error: any) {
        console.error('Direct Passport Strategy Error:', error);
        return done(error, false);
      }
    }));

    // Add passport to fastify instance
    fastify.decorate('passport', passport);
    
    // Add authentication helper method
    fastify.decorate('authenticateLocal', async (request: any, reply: any) => {
      return new Promise((resolve, reject) => {
        passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
          if (err) {
            return reject(err);
          }
          if (!user) {
            return reject(new Error(info?.message || 'Authentication failed'));
          }
          request.user = user;
          resolve(user);
        })(request, reply);
      });
    });

    console.log('✅ Direct Passport plugin registered successfully');
  };
};

export const DIRECT_PASSPORT_STRATEGY_NAME = 'direct-passport';
