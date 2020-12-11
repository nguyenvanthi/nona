const R = require('ramda');

const defaultOptions = {
  merge: false,
  metadata: {
    repository: undefined,
    options: {},
  },
  repository: undefined,
  options: {},
  format: R.identity,
};

const findAllMetadata = (metadataRepository, options) => (entityId) =>
  metadataRepository.findByRelationId(entityId, options);

const mergeMetadata = (entity, listOfMetadata) =>
  R.mergeLeft(entity, R.mergeAll(listOfMetadata.map((meta) => ({ [meta.key]: [meta.value] }))));

const findAllEntities = (repository, options) => repository.findAll(options);

const findAll = async (options = {}) => {
  const opts = R.mergeLeft(options, defaultOptions);
  const getAllMetadata = findAllMetadata(opts.metadata.repository, options.metadata.options);
  const plainEntities = await findAllEntities(opts.repository, opts.options);

  return await Promise.all(
    plainEntities.map(async (entity) => {
      const listOfMetadata = await getAllMetadata(entity.id);
      const mergedEntity = mergeMetadata(entity, listOfMetadata);

      return opts.format(mergedEntity);
    })
  );
};

module.exports = findAll;
