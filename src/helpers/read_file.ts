/**/
import fs from 'fs/promises';
import Decrypt from './decrypt';
import config from './read_config_file.js';

export default async function ReadFile(): Promise<object> {
  try {
    const data = await fs.readFile(config.DB_NAME, { encoding: 'utf8' });

    return JSON.parse(Decrypt(data.toString()));
  } catch (err: any) {
    return err;
  }
}
