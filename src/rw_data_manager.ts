import RewriteFile from './helpers/rewrite_file.ts';
import ReadFile from './helpers/read_file.ts';
import { getValueOperator } from './helpers/get_value_operator.ts';
import { getProp, setProp } from './helpers/getset.ts';
import { Where } from './helpers/where.ts';
import { TypeFileStructure } from './models/type_file_structure.ts'

export default class DbManager<T> {
	fileName: string;
	prop: string;

	constructor(fileName: string, prop: string) {
		this.fileName = fileName;
		this.prop = prop;
	}

	public async get(whereOperation?: string | object, where?: object): Promise<T[]> {

		const propObjects: T[] = getProp<T>(this.prop, await ReadFile(this.fileName));

		if (!propObjects) return null;

		if (!whereOperation && !where) return propObjects;

		if (typeof whereOperation === "string") {

			let dtFilted: T[] = [];

			if (where) {
				dtFilted = Where(where, propObjects);
			}

			return getValueOperator(dtFilted as T[], whereOperation);

		} else {
			return Where(whereOperation as object, propObjects);
		}
	}
	//
	public async post(obj: T): Promise<T> {
		const propObject = await this.get();

		if (!propObject) return null;

		propObject.push(obj);

		const fileObject = setProp<T>(this.prop, propObject, await ReadFile(this.fileName));

		RewriteFile(this.fileName, fileObject);

		return obj;
	}
	//
	public async put(obj: T, where: object): Promise<T> {
		const propObject: T[] = await this.get();

		if (!propObject) return null;

		const props = Reflect.ownKeys(where as object);

		const index: number = propObject.findIndex((dto: T) => {
			return props.every((prop: string) => { return dto[prop as keyof T] === where[prop]; })
		});

		if (index === -1) return null;

		propObject[index] = obj;

		const fileObject = setProp<T>(this.prop, propObject, await ReadFile(this.fileName));

		RewriteFile(this.fileName, fileObject);

		return obj as T;
	}
	//
	public async delete(where: object): Promise<T> {
		const propObject: T[] = await this.get();

		if (!propObject) return null;

		const props = Reflect.ownKeys(where as object);

		const index: number = propObject.findIndex((dto: T) => {
			return props.every((prop: string) => { return dto[prop as keyof T] === where[prop]; })
		});

		if (index === -1) return null;

		propObject.splice(index, 1);

		const fileObject = setProp<T>(this.prop, propObject, await ReadFile(this.fileName));

		RewriteFile(this.fileName, fileObject);
	}
}

