import crypto from 'crypto';
import { join, dirname } from 'path';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';

export function getOrCreateSecretKey(basePath:string): string {
  const keyFilePath = join(basePath, '.secure_credentials');

  try {
    return (readFileSync(keyFilePath)).toString('utf-8');
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return generateAndStoreSecretKey(keyFilePath);
    } else {
      throw error;
    }
  }
}

function generateAndStoreSecretKey(filePath: string): string {
  try {
    const dataDir = dirname(filePath);
    mkdirSync(dataDir, { recursive: true });

    const newKey = (crypto.randomBytes(32)).toString('utf-8');
    writeFileSync(filePath, newKey);
    return newKey;
  } catch (error) {
    throw error;
  }
}


