import { FastifyReply, FastifyRequest } from 'fastify';

export function responseInterceptor(
    request: FastifyRequest,
    reply: FastifyReply,
    payload: any,
    done: (err: Error | null, payload?: any) => void
) {
    reply.header('accept-encoding', 'gzip, deflate, br, zstd');
    try {
        // Check if response has already been sent
        if (reply.sent) {
            return done(null, payload);
        }

        // Skip for certain methods
        if (request.method === 'OPTIONS' || request.method === 'HEAD') {
            return done(null, payload);
        }

        // Check if reply and reply.statusCode exist
        if (!reply || typeof reply.statusCode === 'undefined') {
            return done(null, payload);
        }

        // Parse payload if it's a string
        const parsedPayload = typeof payload === 'string' ? JSON.parse(payload) : payload;

        // Skip if already processed or is an error response
        if (parsedPayload?.is_err) {
            parsedPayload.is_err = undefined;
            return done(null, JSON.stringify(parsedPayload));
        }

        // Wrap successful response
        let data = parsedPayload?.data ?? parsedPayload


        // Wrap successful response
        const wrapped = {
            message: parsedPayload?.message || 'Success',
            statusCode: parsedPayload?.statusCode || reply.statusCode || 200,
            data: data,
            meta: parsedPayload.pagination
        };

        done(null, JSON.stringify(wrapped));

    } catch (error: any) {
        console.error('Error in response interceptor:', error);
        // Return original payload on error to prevent further issues
        done(null, payload);
    }
}