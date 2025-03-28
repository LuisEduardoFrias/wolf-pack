import { entity_config } from './entity_config.ts'

export type TypeFileStructure = {
	__data_config__: {
		[key: string | number | symbol]: EntityConf
	}[],
	props: {
		[key: string | number | symbol]: {
			[key: string | number | symbol]: any
		}[]
	}[]
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