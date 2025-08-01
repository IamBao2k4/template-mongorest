// HYBRID APPROACH: Support both Direct Passport and Manual fallback
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../auth.service';

// Try to import passport stuff, but don't fail if they don't exist
let passport: any = null;
let LocalStrategy: any = null;

try {
  passport = require('passport');
  const passportLocal = require('passport-local');
  LocalStrategy = passportLocal.Strategy;
} catch (error) {
  console.log('⚠️ Passport packages not available, will use manual auth');
}

export const createHybridAuthPlugin = (authService: AuthService) => {
  return async (fastify: FastifyInstance) => {
    
    if (passport && LocalStrategy) {
      // PASSPORT APPROACH: If packages are available
      try {
        passport.use('local', new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
        }, async (email: string, password: string, done: Function) => {
          try {
            console.log('🔐 Passport Local Strategy - validating:', email);
            
            const user = await authService.validateCredentials(email, password);
            
            if (!user) {
              return done(null, false, { message: 'Invalid email or password' });
            }
            
            return done(null, user);
          } catch (error: any) {
            console.error('Passport Strategy Error:', error);
            return done(error, false);
          }
        }));

        // Add passport to fastify instance
        fastify.decorate('passport', passport);
        
        // Add authentication helper
        fastify.decorate('authenticateLocal', async (request: any, reply: any) => {
          return new Promise((resolve, reject) => {
            passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
              if (err) return reject(err);
              if (!user) return reject(new Error(info?.message || 'Authentication failed'));
              request.user = user;
              resolve(user);
            })(request, reply);
          });
        });

        // Store approach type
        (fastify as any).authApproach = 'passport';
        console.log('✅ Hybrid Auth: Using Passport approach');
        
      } catch (error: any) {
        console.log('❌ Passport setup failed:', error.message);
        (fastify as any).authApproach = 'manual';
      }
      
    } else {
      // MANUAL APPROACH: Fallback
      (fastify as any).authApproach = 'manual';
      console.log('✅ Hybrid Auth: Using Manual approach');
    }

    // Add universal authentication method
    fastify.decorate('authenticateUser', async (request: any, reply: any) => {
      const approach = (fastify as any).authApproach;
      
      if (approach === 'passport' && (fastify as any).authenticateLocal) {
        // Use Passport
        return await (fastify as any).authenticateLocal(request, reply);
      } else {
        // Use Manual
        const body = request.body as { email?: string; password?: string };
        
        if (!body.email || !body.password) {
          throw new Error('Email and password are required');
        }

        const user = await authService.validateCredentials(body.email, body.password);
        
        if (!user) {
          throw new Error('Invalid email or password');
        }

        request.user = user;
        return user;
      }
    });

    console.log('✅ Hybrid Auth Plugin registered successfully');
  };
};

export const HYBRID_AUTH_NAME = 'hybrid-auth';
