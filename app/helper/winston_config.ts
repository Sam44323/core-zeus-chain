var winston = require("winston");
require("winston-daily-rotate-file");

var transport = new winston.transports.DailyRotateFile({
  filename: "logger-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "4d",
});

transport.on("rotate", function (oldFilename: any, newFilename: any) {});

var logger = winston.createLogger({
  transports: [transport, new winston.transports.Console()],
});

export default logger;
