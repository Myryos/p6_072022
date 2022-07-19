const root = require('app-root-path');
const winston = require('winston')

const settings={
    file:{
        level: 'info',
        filename: `${root}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    },
    console:
    {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(settings.file),
    new winston.transports.Console(settings.console)
  ],
  exitOnError: false
});

logger.stream = 
{
    write: function(message, encoding)
    {
        logger.info(message)
    }
}

module.exports = logger;