import 'dotenv/config';
import './apm';
import Fastify from 'fastify';
import { performance } from 'perf_hooks';
import compress from 'compression';

import { IndexRoute } from './routes/_index';
import { InitialCore, filterPassword } from './configs/core-global';
import { appSettings } from './configs/app-settings';

import cors from '@fastify/cors';
import fastifyJwt from 'fastify-jwt';
import { responseInterceptor } from './response';

import { createDebugLogger } from './logger/simple-logger';
import { logAppEvent, logError } from './middleware/logging';
import { registerAllGeneratedRoutes } from './generated/alias';
import { DynamicCronService } from './jobs/cron';

const debugLogger = createDebugLogger();

declare global {
    var filterPassword: any;
}

global.filterPassword = filterPassword;

const handleUncaughtException = (err: Error) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
};

const handleUnhandledRejection = (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
};

process.on('uncaughtException', handleUncaughtException);
process.on('unhandledRejection', handleUnhandledRejection);

const app = Fastify();
const addPerformanceTracking = () => {
    app.addHook('onRequest', async (request) => {
        (request as any).startTime = performance.now();
        debugLogger.debug('Request started', {
            url: request.url,
            method: request.method,
            query: request.query,
            params: request.params
        });
    });
};

const addResponseLogging = () => {
    app.addHook('onResponse', async (request, reply) => {
        const duration = performance.now() - ((request as any).startTime || 0);
        // Ignore logging cho OPTIONS requests
        if (request.method === 'OPTIONS') {
            return;
        }

        logAppEvent(request, reply, {
            action: 'request_completed',
            duration: Math.round(duration * 100) / 100
        });

        debugLogger.debug('Request completed', {
            url: request.url,
            method: request.method,
            statusCode: reply.statusCode,
            duration: `${Math.round(duration)}ms`
        });
    });
};

const setupErrorHandler = () => {
    app.setErrorHandler(async (error, request, reply) => {
        logError(request, reply, error, 'Global Error Handler');

        reply.status(500).send({
            error: 'Internal Server Error',
            message: error.message
        });
    });
};

const registerPlugins = async () => {
    await app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || "supersecret"
    });
    
    // HYBRID APPROACH: Try Passport, fallback to Manual
    try {
        const { createHybridAuthPlugin } = await import('./module/auth/strategies/hybrid-auth.strategy');
        const { AuthService } = await import('./module/auth/auth.service');
        
        const authService = new AuthService();
        const hybridAuthPlugin = createHybridAuthPlugin(authService);
        
        await app.register(hybridAuthPlugin);
        console.log('✅ HYBRID AUTH: Plugin registered successfully!');
        
    } catch (error: any) {
        console.log('❌ HYBRID AUTH failed:', error.message);
        console.log('⚠️ Will use basic manual authentication in controller');
    }
    
    await app.register(cors, {
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ["*"]
    });
};

const registerRoutes = async () => {
    console.log(6)
    app.get('/', async (request, reply) => {
        return { message: 'Hello, Mongorest lib!' };
    });

    if (appSettings.prefixApi) {
        await app.register(registerAllGeneratedRoutes, {
            prefix: `${appSettings.prefixApi}/protean`
        });
        await app.register(async function (fastify) {
            IndexRoute(fastify);
        }, { prefix: appSettings.prefixApi });

    } else {
        IndexRoute(app);
    }
};
const start = async () => {
    try {
        console.log(1)
        await InitialCore();
        console.log(2)
        addPerformanceTracking();
        addResponseLogging();
        setupErrorHandler();
        const dynamicCronService = new DynamicCronService();
        await dynamicCronService.onModuleInit();

        await app.register(compress);

        app.addHook('onSend', responseInterceptor);

        await registerPlugins();
        console.log(3)
        await registerRoutes();
        console.log(4)
        const port = parseInt(appSettings.port || '3000');

        await app.listen({ port, host: '0.0.0.0' });

        if (appSettings.prefixApi) {
            console.log(`Server is running at http://localhost:${port}${appSettings.prefixApi}`);
        } else {
            console.log(`Server is running at http://localhost:${port}`);
        }
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

start();

