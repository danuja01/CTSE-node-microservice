import { format as _format, transports as _transports, createLogger } from 'winston';

const logger = createLogger({
  level: 'info',
  format: _format.combine(
    _format.label({ label: 'feedback-service' }),
    _format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    _format.errors({ stack: true }),
    _format.splat(),
    _format.json()
  ),
  transports: [
    new _transports.Console({
      format: _format.combine(_format.colorize(), _format.simple())
    }),
    new _transports.File({ filename: 'app.log', level: 'info' })
  ]
});

export default logger;
