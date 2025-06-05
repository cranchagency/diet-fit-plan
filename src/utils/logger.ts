type LogLevel = 'info' | 'warn' | 'error';

interface LogMessage {
  level: LogLevel;
  message: string;
  meta?: Record<string, any>;
  timestamp: string;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, meta?: Record<string, any>): LogMessage {
    return {
      level,
      message,
      meta,
      timestamp: new Date().toISOString()
    };
  }

  private log(logMessage: LogMessage) {
    const { level, message, meta, timestamp } = logMessage;
    const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
    console[level](`[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`);
  }

  info(message: string, meta?: Record<string, any>) {
    this.log(this.formatMessage('info', message, meta));
  }

  warn(message: string, meta?: Record<string, any>) {
    this.log(this.formatMessage('warn', message, meta));
  }

  error(message: string, meta?: Record<string, any>) {
    this.log(this.formatMessage('error', message, meta));
  }
}

export const logger = new Logger();