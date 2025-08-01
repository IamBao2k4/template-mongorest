// middleware/logging.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { performance } from 'perf_hooks'
import { appLogger, createDebugLogger } from '../logger/simple-logger'
const debugLogger = createDebugLogger()

// 🔍 Get caller file and line automatically - VS Code format
const getCallerInfo = () => {
  const stack = new Error().stack
  if (!stack) return { location: 'unknown:0:0' }
  
  const lines = stack.split('\n')
  // Skip: Error, getCallerInfo, logDebug, actual caller
  const callerLine = lines[4] || lines[3] || ''
  
  // Parse: "at functionName (/path/to/file.ts:123:45)" or "at /path/to/file.ts:123:45"
  const match = callerLine.match(/\((.+):(\d+):(\d+)\)/) || 
                callerLine.match(/at\s+(.+):(\d+):(\d+)/)
  
  if (match) {
    const fullPath = match[1]
    const line = match[2]
    const column = match[3]
    
    // Format: E:\MangoAds\mge-v2-2025\mongorest\src\index.ts:109:7
    return { 
      location: `${fullPath}:${line}:${column}`,
      filepath: fullPath,
      line: parseInt(line),
      column: parseInt(column)
    }
  }
  
  return { location: 'unknown:0:0' }
}

// 📊 App Log Helper - Business metrics
export const logAppEvent = (
  req: FastifyRequest,
  reply: FastifyReply,
  data: {
    action?: string
    duration?: number
    payload?: any
    metadata?: any
  }
) => {
  appLogger.info(
    `${req.method} ${req.url} - ${reply.statusCode} (${data.duration}ms)`,
    {
      timestamp: new Date().toISOString(),
      duration: data.duration,
      request: {
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
        body: req.body,
        headers: {
          userAgent: req.headers['user-agent'],
          contentType: req.headers['content-type']
        },
        ip: req.ip
      },
      response: {
        statusCode: reply.statusCode,
        headers: reply.getHeaders()
      },
      action: data.action,
      payload: data.payload,
      metadata: data.metadata
    }
  )
}

// 🐛 Debug Log Helper - Technical details với auto caller detection
export const logDebug = (
  req: FastifyRequest,
  message: string,
  data?: {
    location?: string  // Override format: "E:\path\file.ts:123:7"
    error?: Error
    extra?: any
  }
) => {
  const callerInfo = data?.location ? 
    { location: data.location } : 
    getCallerInfo()
  
  debugLogger.debug({
    url: req.url,
    method: req.method,
    location: callerInfo.location,
    error: data?.error,
    ...data?.extra
  }, message)
}

// 🔥 Error Logger - Both loggers
export const logError = (
  req: FastifyRequest,
  reply: FastifyReply,
  error: Error,
  context?: string
) => {
  const callerInfo = getCallerInfo()
  
  // App Logger - Business impact
  appLogger.error(
    `ERROR: ${req.method} ${req.url} - ${error.message}`,
    {
      timestamp: new Date().toISOString(),
      request: {
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params
      },
      response: {
        statusCode: reply.statusCode || 500
      },
      error: {
        name: error.name,
        message: error.message
      },
      context
    }
  )

  // Debug Logger - Technical details with location
  debugLogger.error(
    `ERROR: ${context || 'Request Error'}`,
    {
      url: req.url,
      method: req.method,
      location: callerInfo.location,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      context
    }
  );
}