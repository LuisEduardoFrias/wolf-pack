import fs from 'fs/promises'
import { desEncript } from './crypto.js'
import { join } from 'path';
import { Config } from '../models/config.js'
import { TypeFileStructure } from '../models/type_file_structure.js'

export default async function ReadFile(fileName: string): Promise<TypeFileStructure> {
	try {
		const filePath = join(Config.DATA_PATH, `${fileName}${Config.FILE_EXTENSION}`);

		const data = await fs.readFile(filePath, { encoding: 'utf8' });

		return Config.ENCRYPT ? JSON.parse(desEncript(data.toString())) : JSON.parse(data.toString());
	} catch (err: any) {
		const error = new Error(err);
		throw error;
	}
}
