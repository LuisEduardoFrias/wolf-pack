import { writeFile, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { encript } from './crypto.js';
import { Config } from '../models/config.js';
import { TypeFileStructure } from '../models/type_file_structure.js';

export default function CreateFile(fileName: string, structureDataFiles: TypeFileStructure, update: boolean): void {
  const filePath = join(Config.DATA_PATH, `${fileName}${Config.FILE_EXTENSION}`);
  const directory = dirname(filePath);
  
  if (!existsSync(directory)) {
    try {
      mkdirSync(directory, { recursive: true });
      //console.log(`Carpeta ${directory} creada exitosamente.`);
    } catch (err) {
      console.error('Error al crear la carpeta:', err);
      return;
    }
  }

  if (existsSync(filePath) && !update) {
    //console.log(`El archivo ${fileName}.json ya existe en: ${filePath}`);
  } else {
    const data = Config.ENCRYPT ? encript(JSON.stringify(structureDataFiles)) : JSON.stringify(structureDataFiles);

    writeFile(filePath, data, (err) => {
      if (err) {
        console.error('Error al crear el archivo:', err);
      } else {
        //console.log(`Archivo ${fileName}.json creado exitosamente en: ${filePath}`);
      }
    });
  }
}
