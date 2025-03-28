
export type EntityConf = {
	primaryKey?: string;
	unique?: string[];
	entity_ref: {
		primaryKey: string,
		foreignKey: string,
		entity: string
	}[]
}
