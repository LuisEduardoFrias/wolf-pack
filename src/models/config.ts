import { getOrCreateSecretKey } from '../helpers/create_key.js'

const ENVIRONMENT_PRODUCTION = true;

const basePath = './.data';

const InternalConfig = {
  ENCRYPT: ENVIRONMENT_PRODUCTION,
  FILE_EXTENSION: ENVIRONMENT_PRODUCTION ? '.wolfpack.db' : '.json'
};

const {
  ENCRYPTION_KEY,
  DATA_PATH,
} = process.env;

const DefaultConfig = {
  ENCRYPTION_KEY: ENCRYPTION_KEY ?? getOrCreateSecretKey(DATA_PATH ?? basePath),
  DATA_PATH: DATA_PATH ?? basePath
}

export const Config = {
  ...InternalConfig,
  ...DefaultConfig
}
