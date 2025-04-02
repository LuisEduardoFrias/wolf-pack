'use strict'
import { TypeConfigProps } from './type_file_structure.js'

type uid = `${string}-${string}-${string}-${string}-${string}`;
export type Id = string | number | symbol | uid;

export class alpha {
	id: Id;
	 entityConfig?: TypeConfigProps | null;

	constructor(idOrConfig?: Id | TypeConfigProps, entityConfig?: TypeConfigProps) {
		this.entityConfig = (idOrConfig && typeof idOrConfig === 'object') ? idOrConfig : entityConfig;
		this.id = (idOrConfig && typeof idOrConfig !== 'object') ? idOrConfig : crypto.randomUUID();
	}

	public json() {
		Reflect.set(this, "constructor", { name: this.constructor.name, });
		const _json: string = JSON.stringify(this);

		return _json;
	}

	public parse(json: string) {
		this.mapper(JSON.parse(json));
	}

	// TODO validar las propiedades 
	public mapper(obj: object) {
		const keys = Reflect.ownKeys(obj);
		keys.forEach(key => {
			Reflect.set(this, key, Reflect.get(obj, key));
		});
	}

	static getInstance<T>(this: new (...args: any[]) => T, ...args: any[]): T {
		if (args.length === 0) {
			return new this();
		} else {
			return new this(...args);
		}
	}
} 
