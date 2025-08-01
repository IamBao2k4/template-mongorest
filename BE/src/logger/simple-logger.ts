// logger.ts - Winston với Daily Rotate File
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'
import fs from 'fs'

const logDir = process.env.LOG_DIR || './logs'

// Tạo thư mục logs nếu chưa tồn tại
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

// Cấu hình format chung
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
)

// Transport cho INFO logs với daily rotation
const infoTransport = new DailyRotateFile({
  filename: path.join(logDir, 'info-%DATE%.json'),
  datePattern: 'YYYY-MM-DD',
  level: 'info',
  handleExceptions: false,
  json: true,
  maxSize: '20m', // Rotate khi file > 20MB
  maxFiles: '30d', // Giữ logs trong 30 ngày
  format: logFormat
})

// Transport cho ERROR logs với daily rotation
const errorTransport = new DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.json'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  handleExceptions: true,
  json: true,
  maxSize: '20m',
  maxFiles: '30d',
  format: logFormat
})

// Transport cho DEBUG logs với daily rotation
const debugTransport = new DailyRotateFile({
  filename: path.join(logDir, 'debug-%DATE%.json'),
  datePattern: 'YYYY-MM-DD',
  level: 'debug',
  handleExceptions: false,
  json: true,
  maxSize: '20m',
  maxFiles: '7d', // Debug logs chỉ giữ 7 ngày
  format: logFormat
})

// Console transport cho development
const consoleTransport = new winston.transports.Console({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      return `${timestamp} [${level}]: ${message} ${metaStr}`
    })
  )
})

// Tạo logger instances
export const infoLogger = winston.createLogger({
  level: 'info',
  transports: [
    infoTransport,
    ...(process.env.NODE_ENV !== 'production' ? [consoleTransport] : [])
  ]
})

export const errorLogger = winston.createLogger({
  level: 'error',
  transports: [
    errorTransport,
    ...(process.env.NODE_ENV !== 'production' ? [consoleTransport] : [])
  ]
})

export const debugLogger = winston.createLogger({
  level: 'debug',
  transports: [
    debugTransport,
    ...(process.env.NODE_ENV !== 'production' ? [consoleTransport] : [])
  ]
})

// Event listeners để log khi rotate file
infoTransport.on('rotate', (oldFilename, newFilename) => {
  console.log(`📋 Info log rotated: ${oldFilename} -> ${newFilename}`)
})

errorTransport.on('rotate', (oldFilename, newFilename) => {
  console.log(`🔥 Error log rotated: ${oldFilename} -> ${newFilename}`)
})

debugTransport.on('rotate', (oldFilename, newFilename) => {
  console.log(`🐛 Debug log rotated: ${oldFilename} -> ${newFilename}`)
})

// Combined app logger
export const appLogger = {
  info: (message: string, meta?: any) => infoLogger.info(message, meta),
  warn: (message: string, meta?: any) => infoLogger.warn(message, meta),
  error: (message: string, meta?: any) => errorLogger.error(message, meta),
  debug: (message: string, meta?: any) => debugLogger.debug(message, meta)
}

// Fastify logger config
export const fastifyLoggerConfig = {
  logger: false // Use our custom loggers instead
}

// Legacy compatibility functions
export const createDebugLogger = () => debugLogger