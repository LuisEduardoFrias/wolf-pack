'use strict'
import { EntityConfig } from "./entity_config.ts";

type uid = `${string}-${string}-${string}-${string}-${string}`;
type Id = string | number | uid;

export class alpha {
	id: Id;
	entity_config: EntityConfig | null;

	constructor(id_entity_config?: Id | EntityConfig, entity_config?: EntityConfig) {
		if (id_entity_config) {

			if (typeof id_entity_config === 'object') {
				this.entity_config = id_entity_config;
			} else {
				this.id = id_entity_config;

				if (entity_config)
					this.entity_config = entity_config;
			}
		}
		else {
			this.id = crypto.randomUUID();
		}
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
