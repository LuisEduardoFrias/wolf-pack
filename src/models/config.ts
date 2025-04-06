//import { environment } from './environment.js'
//import { fileURLToPath } from 'url'
//import { dirname,join } from 'path'

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

//const ENVIRONMENT: environment = environment.DEVELOPMENT;
//const ENVIRONMENT = environment.PRODUCTION;
import { getOrCreateSecretKey } from '../helpers/create_key.js'

const ENVIRONMENT_PRODUCTION = true;

const InternalConfig = {
  ENCRYPT: ENVIRONMENT_PRODUCTION,
  FILE_EXTENSION: ENVIRONMENT_PRODUCTION ? '.wolfpack.db' : '.json'
};

const {
  ENCRYPTION_KEY,
  DATA_PATH,
} = process.env;

const DefaultConfig = {
  ENCRYPTION_KEY: ENCRYPTION_KEY ?? getOrCreateSecretKey(),
  DATA_PATH: DATA_PATH ?? './DATA'
}

export const Config = {
  ...InternalConfig,
  ...DefaultConfig
}
