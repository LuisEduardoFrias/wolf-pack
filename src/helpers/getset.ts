import { TypeFileStructure } from '../models/type_file_structure.ts'

export function getProp<T>(propName: string, fileObject: TypeFileStructure): Array<T> {

	console.log("neww: ", fileObject)

	if (!fileObject) return null;
	return fileObject.props[propName] as T[];
};

export function setProp<T>(propName: string, prop: T, fileObject: TypeFileStructure): object {
	fileObject.props[propName] = prop;
	return fileObject;
};
