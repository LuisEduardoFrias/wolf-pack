export type TypeFileStructure = {
	__data__: object,
	props: {
		[key: string | number | symbol]: {
			[key: string | number | symbol]: any
		}[]
	}[]
}
/*
{
	"__data__": { },
	"props": {
		"UserModel": [],
			"PhoneModel": [],
				"CapacityModel": []
	}
}
*/