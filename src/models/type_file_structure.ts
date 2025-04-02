
export type TypePropName = string | symbol;


export type TypeExternalObject = {
	[key: TypePropName]: any,
	entityConfig?: TypeConfigProps
}

export type TypeObject = {
	[key: TypePropName]: any
}

export type TypeDataObject = {
	[key: TypePropName]: TypeObject[]
}

export type TypeEntityRef = {
	primaryKey: string,
	foreignKey: string,
	entity: string
};

export type TypeConfigProps = {
	primaryKey: string,
	uniques: string[],
	entityRefs: TypeEntityRef[]
	relationships: string[]
}

export type TypeDataConfig = {
	[key: TypePropName]: TypeConfigProps,
}

export type TypeFileStructure = {
	__data_config__: TypeDataConfig,
	data: TypeDataObject
}

/*
{
	"__data_config__": {
		"UserModel": {
			"primaryKey" ?: string;
			"unique" ?: string[];
			"entity_ref" ?: [
				{
					primaryKey: string,
					foreignKey: string
					entity: string
				}
			];
			"relationship": string[]
		}
	}
	"props": {
		"UserModel": [
		{
			"name":string
		}
		];
		"PhoneModel": [];
		"CapacityModel": [];
	}
}
*/
