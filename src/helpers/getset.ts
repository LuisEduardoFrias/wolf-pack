import { TypeFileStructure, TypeProps } from '../models/type_file_structure.js'

export function getProp<T>(propName: string, fileObject: TypeFileStructure): Array<T> | null {
	if (!fileObject) return null;
	return fileObject.props[propName as keyof TypeProps] as T[];
};

export function setProp<T>(propName: string, prop: T, fileObject: TypeFileStructure): object {
	fileObject.props[propName as keyof TypeProps] = prop;
	return fileObject;
};
