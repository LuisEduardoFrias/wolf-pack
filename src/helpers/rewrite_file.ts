/**/

import fs from 'fs/promises';
import encript from './encrypt.js';
import config from './read_config_file.js';
//
export default async function RewriteFile(data: object): Promise<object> | Promise<null> {
  try {
    await fs.writeFile(config.DB_NAME, encript(JSON.stringify(data)));
    return data;
  } catch (err: any) {
    return null;
  }
}
