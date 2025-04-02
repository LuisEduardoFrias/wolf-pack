import RewriteFile from './helpers/rewrite_file.js';
import ReadFile from './helpers/read_file.js';
import { getValueOperator } from './helpers/get_value_operator.js';
import { getProp, setProp } from './helpers/getset.js';
import { Where } from './helpers/where.js';
import { TypeFileStructure, TypeObject, TypeExternalObject, TypeEntityRef } from './models/type_file_structure.js'

class Validate<T extends TypeExternalObject>{
	dataFile: TypeFileStructure;
	newPropObject: T;
	prop: string;

	constructor(dataFile: TypeFileStructure, newPropObject: T, prop: string) {
		this.dataFile = dataFile;
		this.newPropObject = newPropObject;
		this.prop = prop;
	}
	//
	public validatePrimaryKey(): Validate<T> {
		const primaryKey: string = (this.dataFile.__data_config__[this.prop])?.primaryKey;
		const props: TypeObject[] = this.dataFile.data[this.prop];

		if (props && primaryKey) {
			props.forEach((prop: TypeObject) => {
				if (prop[primaryKey] === this.newPropObject[primaryKey as keyof T]) {
					const error = new Error(`La propiedad '${primaryKey}' con el valor '${prop[primaryKey]}', esta configurada como 'primaryKey' no pueden existir dublicados.`)
					throw error;
				}
			})
		}

		return this;
	}
	//
	public validateUnique(): Validate<T> {
		const uniques = (this.dataFile.__data_config__[this.prop])?.unique;
		const props: TypeObject[] = this.dataFile.data[this.prop];

		if (props && uniques) {
			uniques.forEach((unique: string) => {
				props.forEach((prop: TypeObject) => {
					if (prop[unique] === this.newPropObject[unique as keyof T]) {
						const error = new Error(`La propiedad '${unique}' con el valor '${prop[unique]}', esta configurada como 'unique' no pueden existir dublicados.`)
						throw error;
					}
				})
			})
		}

		return this;
	}
	//
	public validateRef(): Validate<T> {
		const entityRef = (this.dataFile.__data_config__[this.prop])?.entityRef;

		if (entityRef?.length > 0) {

			entityRef.forEach((ref: TypeEntityRef) => {
				const refPk: string = (this.dataFile.__data_config__[ref.entity])?.primaryKey;

				if (refPk !== ref.primaryKey) {
					const error = new Error('discrepancias en la referecia entre foreignKey y primaryKey.');
					throw error;
				}

				const isEqual = (this.dataFile.data[ref.entity]).some((prop) =>
					prop[refPk] === this.newPropObject[ref.foreignKey as keyof T]);

				if (!isEqual) {
					const error = new Error(`No existe un valor para la referencia en '${ref.entity}'.`);
					throw error;
				}
			})
		}

		return this;
	}
	//
	public removeEntityConfig(): Validate<T> {
		if (this.newPropObject?.entityConfig) {
			delete this.newPropObject.entityConfig;
		}

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

	public async get(whereOperation?: string | object, where?: object): Promise<T[] | null> {

		const propObjects: T[] | null = getProp<T>(this.prop, await ReadFile(this.fileName));

		if (!propObjects) return null;

		if (!whereOperation && !where) return propObjects;

		if (typeof whereOperation !== "string") {
			return Where<T>(whereOperation as object, propObjects);
		}

		let dtFilted: T[] = [];

		if (where) {
			dtFilted = Where<T>(where, propObjects);
		}

		return getValueOperator(dtFilted as T[], whereOperation);
	}
	//
	public async post(obj: T): Promise<T | null> {

		const { fileObject, dataObjects } = await this.validated(obj);
		const propObjects: T[] | null = getProp<T>(this.prop, fileObject);

		if (!propObjects) return null;

		propObjects.push(dataObjects);

		const _fileObject = setProp<T>(this.prop, propObjects, fileObject);

		RewriteFile(this.fileName, _fileObject);

		return dataObjects;
	}
	//
	public async put(obj: T, where: object): Promise<T | null> {

		const { fileObject, dataObjects } = await this.validated(obj);
		const propObjects: T[] | null = getProp<T>(this.prop, fileObject);

		if (!propObjects) return null;

		const props = Reflect.ownKeys(where as object);

		const index: number = propObjects.findIndex((dto: T) => {
			return props.every((prop: string) => { return dto[prop as keyof T] === where[prop]; })
		});

		if (index === -1) return null;

		propObjects[index] = dataObjects;

		const _fileObject = setProp<T>(this.prop, propObjects, fileObject);

		RewriteFile(this.fileName, _fileObject);

		return dataObjects;
	}
	//
	public async delete(where: object): Promise<T> {
		const dataFile = await ReadFile(this.fileName);

		if (!dataFile) return null;

		const propObject = (dataFile.__data_config__[this.prop]);
		const relationship = propObject?.relationship;
		const primaryKey = propObject?.primaryKey;
		const props: T[] = dataFile.data[this.prop];

		const values = Reflect.ownKeys(where as object);

		const index: number = props.findIndex((dto: T) => {
			return values.every((value: string) => { return dto[value as keyof T] === where[value]; })
		});

		if (index === -1) return null;

		if (relationship) {
			const valuePrimaryKey = props[index][primaryKey];

			relationship.forEach((rs) => {
				const foreignKey = (dataFile.__data_config__[rs])?.entityRef?.foreignKey;
				const _props = dataFile.data[rs];

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
	private async validated(obj: T): Promise<{ fileObject: TypeDataConfig, dataObjects: TypeDataObject }> {
		const Validate_ = new Validate(await ReadFile(this.fileName), obj, this.prop);

		Validate_
			.validatePrimaryKey()
			.validateUnique()
			.validateRef()
			.removeEntityConfig();

		return {
			fileObject: Validate_.dataFile,
			dataObjects: Validate_.newPropObject as TypeDataObject
		};
	}
}