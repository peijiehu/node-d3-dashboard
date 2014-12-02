var winston = require('winston');
require('winston-syslog').Syslog;
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            level: 'warning',
            datePattern: '.yyyy-MM-dd',
            filename: './logs/app.log',
            handleExceptions: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 1,
            colorize: true,
            timestamp: function(){ return new Date(); }
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: function(){ return new Date(); }
        })
        // new winston.transports.Syslog({
        //     level: 'warning',
        //     host: '1.1.1.1',
        //     port: '123',
        //     protocol: 'udp4',
        //     localhost: 'my-localhost'
        // })
    ],
    exitOnError: false
});

// TODO: rotate log files, keep recent 7 days?
//       Two ways: write a rotatelog.js in utils to handle it internally;
//                 using unix logrotate to handle it externally

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};