/**/
import fs from 'fs/promises';
import Encript from './encrypt.js';
import Decrypt from './decrypt.js';
import config from './read_config_file.js';
//
export default async function RewriteFile(fileName: string, obj: object): Promise<object> | Promise<null> {
  try {
    const data = await fs.readFile(config?.DB_NAME as string, { encoding: 'utf8' });

    const dbObject = JSON.parse(Decrypt(data.toString()));

    dbObject[fileName] = obj;

    await fs.writeFile(config?.DB_NAME as string, Encript(JSON.stringify(dbObject)));
    return obj;
  } catch (err: any) {
    return null;
  }
}
