import { TypeFileStructure } from '../models/type_file_structure.js'

export function getProp<T>(propName: string, fileObject: TypeFileStructure): Array<T> | null {
	if (!fileObject) return null;
	return fileObject.data[propName as keyof T] as T[];
};

export function setProp<T>(propName: string, prop: T[], fileObject: TypeFileStructure): TypeFileStructure {
	fileObject.data[propName as keyof T] = prop as object[];
	return fileObject;
};