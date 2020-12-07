const R = require("ramda");

const onWorkerOnline = (worker) =>
  console.debug(`Worker ${worker.id} (pid: ${worker.process.pid}) is online.`);

const onWorkerExit = (cluster) => (worker) => {
  console.debug(`Worker ${worker.id} (pid: ${worker.process.pid}) died.`);
  cluster.fork();
};

const forkRangeOfWorker = (numberOfCluster, cluster) => {
  const forkNewWorker = (cluster) => cluster.fork();

  R.range(0, numberOfCluster).map(R.always(cluster)).forEach(forkNewWorker);
};

module.exports = {
  forkRangeOfWorker,
  onWorkerExit,
  onWorkerOnline,
};
