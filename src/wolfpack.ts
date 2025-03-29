'use strict'
import CreateFile from './helpers/create_file.js'
import { TypeFileStructure } from './models/type_file_structure.js'
import SubwriteFile from './helpers/rewrite_file.js'
import DbManager from './rw_data_manager.js'
import {Entity_ref} from './models/entity_config.js'
//
export type TypeWolfpack = {
	member: any[],
	wolfpack: string
}


const structureDataFiles: TypeFileStructure = {
	__data_config__: {},
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
			let relationBetween: { prop: string, refsProp: string[] }[] = [];

			wolfpack_.member.forEach((classType: any) => {
				const instance = new classType(...[]);

				Reflect.set(
					newWolfpack,
					classType.name,
					new DbManager<typeof instance>(wolfpack_.wolfpack, classType.name)
				);

				if (instance?.entity_config?.entity_ref) {
					const refs: string[] = [];
					instance?.entity_config
						?.entity_ref?.forEach((ref: Entity_ref) => {
							refs.push(ref.entity)
						})

					relationBetween.push({
						prop: classType.name,
						refsProp: refs
					})
				}

				Reflect.set(structureDataFiles.__data_config__, classType.name, instance.entity_config ?? {
					primaryKey: 'id',
					entity_ref: [],
					relationship: [],
					unique: null,
				});

				Reflect.set(structureDataFiles.props, classType.name, []);
			})

			Reflect.set(WolfPack.instance, wolfpack_.wolfpack, newWolfpack);

			relationBetween.forEach((rb) => {
				rb.refsProp.forEach((rp: string) => {

					const data = structureDataFiles.__data_config__[rp as keyof { [key: string]: any }];

					Reflect.set(structureDataFiles.__data_config__, rp, {
						...data,
						relationship: [...data?.relationship, rb.prop],
					});
				})
			})

			CreateFile(wolfpack_.wolfpack, structureDataFiles, update);
		})
	}
};
