import { environment } from './environment.ts'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//
const ENVIRONMENT = environment.DEVELOPMENT;
//const ENVIRONMENT = environment.PRODUCTION;

const InternalConfig = {
	ENCRYPT: ENVIRONMENT === environment.PRODUCTION,
	FILE_EXTENSION: ENVIRONMENT === environment.PRODUCTION ? '.wolfpack' : '.json'
};

const {
	ENCRYPTION_KEY = 'aVeryLongAndSecureKeyWith32Bytes',
	DATA_PATH = join(__dirname, '../../DATA')
} = process.env;

export const Config = {
	...InternalConfig,
	ENCRYPTION_KEY,
	DATA_PATH: join(__dirname, DATA_PATH)
}
