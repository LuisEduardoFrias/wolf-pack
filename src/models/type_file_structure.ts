import { EntityConfg } from './entity_config.js'

export type TypeProps = {
	[key: string | number | symbol]: {
		[key: string | number | symbol]: any
	}[]
}

export type TypeFileStructure = {
	__data_config__: {
		[key: string | number | symbol]: EntityConfg
	}[],
	props: TypeProps[]
}
/*
{
	"__data_config__": [
		"UserModel": {
			"primaryKey"?: string;
			"unique"?: string[];
			entity_ref?: [
				{
					primaryKey: string,
					foreignKey: string
					entity: string
				}
			]
		}
	]
	"props": [
		{
			"UserModel": [],
			"PhoneModel": [],
			"CapacityModel": []
		}
	]
}
*/