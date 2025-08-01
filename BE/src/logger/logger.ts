// logger.ts - Dual Logging System
import pino from 'pino'
import pinoCaller from 'pino-caller'
import path from 'path'

const logDir = process.env.LOG_DIR || './logs'

// Helper function to get filename with date pattern
const getLogFilename = (type: string): string => {
  const datePattern = process.env.LOG_DATE_PATTERN || 'YYYY-MM-DD'
  const today = new Date()
  
  const dateStr = datePattern
    .replace('YYYY', today.getFullYear().toString())
    .replace('MM', (today.getMonth() + 1).toString().padStart(2, '0'))
    .replace('DD', today.getDate().toString().padStart(2, '0'))
  
  return path.join(logDir, `${type}-${dateStr}.json`)
}

// 📊 INFO LOGGER với daily rotate pattern
export const infoLogger = pino({
  name: 'app-info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) { return { level: label } },
    bindings() { return {} }
  }
}, pino.destination({
  dest: getLogFilename('info'),
  sync: false,
  mkdir: true
}))

// 🔥 ERROR LOGGER với daily rotate pattern  
export const errorLogger = pino({
  name: 'app-error',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) { return { level: label } },
    bindings() { return {} }
  }
}, pino.destination({
  dest: getLogFilename('error'),
  sync: false,
  mkdir: true
}))

// 🐛 DEBUG LOGGER - Console only
export const debugLogger = pinoCaller(pino({
  name: 'debug',
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname,name',
      messageFormat: 'DEBUG {msg}'
    }
  }
}))

// 📝 COMBINED APP LOGGER
export const appLogger = {
  info: (obj: any, msg?: string) => infoLogger.info(obj, msg),
  warn: (obj: any, msg?: string) => infoLogger.warn(obj, msg),
  error: (obj: any, msg?: string) => errorLogger.error(obj, msg)
}



// 🔧 FASTIFY LOGGER CONFIG
export const fastifyLoggerConfig = {
  logger: false // Use our custom loggers instead
}