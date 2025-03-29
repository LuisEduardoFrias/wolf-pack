
export type Entity_ref = {
	primaryKey: string,
	foreignKey: string,
	entity: string
};

export type EntityConfg = {
	primaryKey?: string;
	unique?: string[];
	entity_ref: Entity_ref[]
}
