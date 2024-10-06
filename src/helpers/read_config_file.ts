/**/
import { existsSync, readFileSync } from 'fs';
import { Config } from './models/config.js';
import { environment } from './models/environment.js';
//

const filePath = 'wpconfig.json';

const defaultConfig: Config = {
  ENVIRONMENT = environment.PRODUCTION,
  DB_NAME = "wpdb",
}


export default function readConfigFile(): Config | null {
  try {

    if (!existsSync(filePath)) return defaultConfig;

    return JSON.parse(readFileSync(filePath, 'utf8')) as Config;
  } catch (error) {
    console.error('Error to read config file.', error);
    return null;
  }
}

