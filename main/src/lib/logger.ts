/**
 * Centralized logging utility
 * 
 * Provides consistent logging across the application with appropriate log levels.
 * In production, error logs can be sent to error tracking services.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface Logger {
  debug: (message: string, ...args: unknown[]) => void
  info: (message: string, ...args: unknown[]) => void
  warn: (message: string, ...args: unknown[]) => void
  error: (message: string, error?: Error | unknown, ...args: unknown[]) => void
}

/**
 * Logger implementation
 * 
 * - debug: Only logs in development mode
 * - info: Logs in all environments
 * - warn: Logs warnings in all environments
 * - error: Logs errors in all environments, can be extended to send to error tracking
 */
export const logger: Logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, ...args)
    }
  },

  info: (message: string, ...args: unknown[]) => {
    console.info(`[INFO] ${message}`, ...args)
  },

  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[WARN] ${message}`, ...args)
  },

  error: (message: string, error?: Error | unknown, ...args: unknown[]) => {
    console.error(`[ERROR] ${message}`, error, ...args)
    
    // In production, send to error tracking service (e.g., Sentry, LogRocket)
    // if (import.meta.env.PROD && error instanceof Error) {
    //   // errorTrackingService.captureException(error, { extra: { message, ...args } })
    // }
  },
}

