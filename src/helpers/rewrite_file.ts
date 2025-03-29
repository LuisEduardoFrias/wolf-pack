import fs from 'fs/promises';
import {encript} from './crypto.js';
import { join } from 'path';
import { Config } from '../models/config.js'
import { TypeFileStructure } from '../models/type_file_structure.js'

export default async function RewriteFile(fileName: string, fileObject: TypeFileStructure) {
	try {
		const filePath = join(Config.DATA_PATH, `${fileName}${Config.FILE_EXTENSION}`);

		const data = Config.ENCRYPT ? encript(JSON.stringify(fileObject)) : JSON.stringify(fileObject);

		await fs.writeFile(filePath, data);
	} catch (err: any) {
		const error = new Error(err);
		throw error;
	}
}
