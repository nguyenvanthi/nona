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

const getEnityKeys = ({ repository }) => Object.keys(repository.schema);

const getPlainEntity = ({ repository, input }) => R.pickAll(get);

const createFindAllMetadataFunction = ({ repository, options }) => (entityId) =>
  repository.findByRelationId(entityId, options);

const mergeMetadata = (list) => R.mergeAll(list.map((meta) => ({ [meta.key]: meta.value })));

const findAllEntities = ({ repository, options }) => repository.findAll(options);

const mergeEntityObject = (findAllMetadata, format) => async (standardEntity) => {
  const listOfMetadata = await findAllMetadata(standardEntity.id);
  const mergedEntity = mergeMetadata(listOfMetadata);
  const entity = R.mergeLeft(standardEntity, mergedEntity);

  return format(entity);
};

const addMetadataField = (findAllMetadata, format) => async (entity) => {
  const clonedEntity = R.clone(entity);

  clonedEntity.metadata = await findAllMetadata(entity.id);

  return format(clonedEntity);
};

/**
 * @typedef {Object} FindAllOptions
 * @property {boolean} merge
 * @property metadata
 * @property repository
 * @property options
 * @property {Function} format
 * @param {FindAllOptions} options
 */
const findAll = async (options = defaultOptions) => {
  const opts = R.mergeLeft(options, defaultOptions);
  const findAllMetadata = createFindAllMetadataFunction(opts.metadata);
  const entities = await findAllEntities(opts);

  if (opts.merge) {
    return await Promise.all(entities.map(mergeEntityObject(findAllMetadata, opts.format)));
  } else {
    return await Promise.all(entities.map(addMetadataField(findAllMetadata, opts.format)));
  }
};

module.exports = findAll;
