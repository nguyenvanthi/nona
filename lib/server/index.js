const cluster = require("cluster");
const environment = require("./lib/environment");
const createLogger = require("./lib/utilities/logger");
const {
  forkRangeOfWorker,
  onWorkerExit,
  onWorkerOnline,
} = require("./lib/utilities/cluster");
const Application = require("./lib/application");

const logger = createLogger(environment);

const startApplication = async () => {
  await Application(logger);
};

if (cluster.isMaster) {
  forkRangeOfWorker(environment.numbersOfCluster, cluster);

  cluster.on("online", onWorkerOnline);
  cluster.on("exit", onWorkerExit(cluster));
} else {
  startApplication().catch((error) => console.error(error));
}
