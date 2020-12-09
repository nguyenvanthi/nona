/* eslint-disable */
const options = {
  merge: false,
  metadata: {},
};

const findAllMetadata = (metadataRepository, options) => (entityId) =>
  metadataRepository.findAll(entityId, options.metadata);
