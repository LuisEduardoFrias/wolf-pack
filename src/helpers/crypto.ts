import crypto from 'crypto';
import { Config } from '../models/config.ts';
import { Buffer } from 'buffer';

const KEY = Buffer.from(Config.ENCRYPTION_KEY, 'utf-8').subarray(0, 32);

function safeEncode(text: string): string {
	return Buffer.from(text).toString('base64');
}

function safeDecode(encodedText: string): string {
	return Buffer.from(encodedText, 'base64').toString('utf-8');
}

export function encript(text: string): string {
	try {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv('aes-256-cbc', KEY, iv);
		let encrypted = cipher.update(text, 'utf-8', 'base64');
		encrypted += cipher.final('base64');
		return safeEncode(iv.toString('hex') + ':' + encrypted);
	} catch (error) {
		console.error('Error durante la encriptación:', error);
		return ''; // O lanzar el error, dependiendo de tu manejo de errores
	}
}

export function desEncript(text: string): string {
	try {
		const decodedText = safeDecode(text);
		const parts = decodedText.split(':');
		if (parts.length !== 2) {
			throw new Error('Formato de texto encriptado incorrecto.');
		}

		const iv = Buffer.from(parts[0], 'hex');
		const encryptedText = parts[1];

		const decipher = crypto.createDecipheriv('aes-256-cbc', KEY, iv);
		let decrypted = decipher.update(encryptedText, 'base64', 'utf-8');
		decrypted += decipher.final('utf-8');
		return decrypted;
	} catch (error) {
		console.error('Error durante la desencriptación:', error);
		return ''; // O lanzar el error
	}
}
