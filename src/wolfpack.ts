'use strict'
import CreateFile from './helpers/create_file.ts'
import { TypeFileStructure } from './models/type_file_structure.ts'
import SubwriteFile from './helpers/rewrite_file.ts'
import DbManager from './rw_data_manager.ts'
//
export type TypeWolfpack = {
	member: any[],
	wolfpack: string
}


const structureDataFiles: TypeFileStructure = {
	__data__: {},
	props: {}
}

export default class WolfPack {
	private static instance: WolfPack;
	private constructor() { }

	public static getInstance(wolfpacks: TypeWolfpack[], update: boolean): WolfPack {

		if (!WolfPack.instance) {
			this.initialice(wolfpacks);
		}

		if (update) {
			this.initialice(wolfpacks, update);
		}

		return WolfPack.instance;
	}

	private static initialice(wolfpacks: TypeWolfpack[], update: boolean) {
		WolfPack.instance = new WolfPack();


		wolfpacks.forEach((wolfpack_: TypeWolfpack) => {

			let newWolfpack = {};

			wolfpack_.member.forEach((classType: any) => {
				const instance = new classType(...[]);

				Reflect.set(
					newWolfpack,
					classType.name,
					new DbManager<typeof instance>(wolfpack_.wolfpack, classType.name)
				);

				Reflect.set(structureDataFiles.props, classType.name, []);
			})

			Reflect.set(WolfPack.instance, wolfpack_.wolfpack, newWolfpack);

			CreateFile(wolfpack_.wolfpack, structureDataFiles, update);
		})
	}
};
