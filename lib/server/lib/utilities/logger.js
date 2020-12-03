/*global require module*/

const Winston = require("winston");
const { consoleFormat } = require("winston-console-format");

module.exports = function initLogger(environment) {
  const { format, transports, createLogger } = Winston;

  const consoleTransportOptions = {
    level: environment?.logger?.console?.level ?? "debug",
    handleExceptions: true,
    format: format.combine(
      format.colorize({ all: true }),
      format.padLevels(),
      consoleFormat({
        showMeta: true,
        metaStrip: ["timestamp", "service"],
        inspectOptions: {
          depth: Infinity,
          colors: true,
          maxArrayLength: Infinity,
          breakLength: 120,
          compact: Infinity,
        },
      })
    ),
  };

  const winstonOptions = {
    transports: [new transports.Console(consoleTransportOptions)],
  };

  const logger = createLogger(winstonOptions);

  Object.keys(logger.levels).forEach((level) => {
    console[level] = logger[level].bind(logger);
  });

  return logger;
};
