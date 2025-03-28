import RewriteFile from './helpers/rewrite_file.ts';
import ReadFile from './helpers/read_file.ts';
import { getValueOperator } from './helpers/get_value_operator.ts';
import { getProp, setProp } from './helpers/getset.ts';
import { Where } from './helpers/where.ts';
import { TypeFileStructure } from './models/type_file_structure.ts'

class Validate<T>{
	dataFile: TypeFileStructure;
	newPropObject: T;
	prop: string;

	constructor(dataFile: TypeFileStructure, newPropObject: T, prop: string) {
		this.dataFile = dataFile;
		this.newPropObject = newPropObject;
		this.prop = prop;
	}
	//
	public validatePrimaryKey(): Validate<J> {
		const primaryKey = (this.dataFile.__data_config__[this.prop])?.primaryKey;
		const props = this.dataFile.props[this.prop];

		if (props && primaryKey) {
			props.forEach((prop) => {
				if (prop[primaryKey] === this.newPropObject[primaryKey]) {
					const error = new Error(`La propiedad '${primaryKey}' con el valor '${prop[primaryKey]}', esta configurada como 'primaryKey' no pueden existir dublicados.`)
					throw error;
				}
			})
		}

		return this;
	}
	//
	public validateUnique(): Validate<J> {
		const uniques = (this.dataFile.__data_config__[this.prop])?.unique;
		const props = this.dataFile.props[this.prop];

		if (props && uniques) {
			uniques.forEach((unique) => {
				props.forEach((prop) => {
					if (prop[unique] === this.newPropObject[unique]) {
						const error = new Error(`La propiedad '${unique}' con el valor '${prop[unique]}', esta configurada como 'unique' no pueden existir dublicados.`)
						throw error;
					}
				})
			})
		}

		return this;
	}
	//
	public validateRef(): Validate<J> {
		const primaryKey = (this.dataFile.__data_config__[this.prop])?.primaryKey;
		const entity_ref = (this.dataFile.__data_config__[this.prop])?.entity_ref;

		if (entity_ref?.length > 0) {

			entity_ref.forEach((ref) => {
				const refPk = (this.dataFile.__data_config__[ref.entity])?.primaryKey;

				if (refPk !== ref.primaryKey) {
					const error = new Error('discrepancias en la referecia entre foreignKey y primaryKey.');
					throw error;
				}

				const isEqual = (this.dataFile.props[ref.entity]).some((prop) =>
					prop[refPk] === this.newPropObject[ref.foreignKey]);

				if (!isEqual) {
					const error = new Error(`No existe un valor para la referencia en '${ref.entity}'.`);
					throw error;
				}
			})
		}

		return this;
	}
	//
	public removeEntityConfig(): Validate<j> {
		delete this.newPropObject.entity_config;
		return this;
	}
}

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

		if (typeof whereOperation !== "string") {
			return Where(whereOperation as object, propObjects);
		}

		let dtFilted: T[] = [];

		if (where) {
			dtFilted = Where(where, propObjects);
		}

		return getValueOperator(dtFilted as T[], whereOperation);


	}
	//
	public async post(obj: T): Promise<T> {

		const { fileObject, newObject } = await this.validated(obj);
		const propObjects: T[] = getProp<T>(this.prop, fileObject);

		if (!propObjects) return null;

		propObjects.push(newObject);

		const _fileObject = setProp<T>(this.prop, propObjects, fileObject);

		RewriteFile(this.fileName, _fileObject);

		return newObject;
	}
	//
	public async put(obj: T, where: object): Promise<T> {

		const { fileObject, newObject } = await this.validated(obj);
		const propObjects: T[] = getProp<T>(this.prop, fileObject);

		if (!propObjects) return null;

		const props = Reflect.ownKeys(where as object);

		const index: number = propObjects.findIndex((dto: T) => {
			return props.every((prop: string) => { return dto[prop as keyof T] === where[prop]; })
		});

		if (index === -1) return null;

		propObjects[index] = newObject;

		const _fileObject = setProp<T>(this.prop, propObjects, fileObject);

		RewriteFile(this.fileName, _fileObject);

		return newObject;
	}
	//
	public async delete(where: object): Promise<T> {
		const dataFile = await ReadFile(this.fileName);

		if (!dataFile) return null;

		const propObject = (dataFile.__data_config__[this.prop]);
		const relationship = propObject?.relationship;
		const primaryKey = propObject?.primaryKey;
		const props = dataFile.props[this.prop];

		const values = Reflect.ownKeys(where as object);

		const index: number = props.findIndex((dto: T) => {
			return values.every((value: string) => { return dto[value as keyof T] === where[value]; })
		});

		if (index === -1) return null;

		if (relationship) {
			const valuePrimaryKey = props[index][primaryKey];

			relationship.forEach((rs) => {
				const foreignKey = (dataFile.__data_config__[rs])?.entity_ref?.foreignKey;
				const _props = dataFile.props[rs];

				if (_props.some((so) => so[foreignKey] === valuePrimaryKey)) {
					return null;
				}
			})
		}

		props.splice(index, 1);

		const fileObject = setProp<T>(this.prop, props, dataFile);

		RewriteFile(this.fileName, fileObject);
	}
	//
	private async validated(obj: T) {
		const Validate_ = new Validate(await ReadFile(this.fileName), obj, this.prop);

		Validate_
			.validatePrimaryKey()
			.validateUnique()
			.validateRef()
			.removeEntityConfig();

		return {
			fileObject: Validate_.dataFile,
			newObject: Validate_.newPropObject
		};
	}
}