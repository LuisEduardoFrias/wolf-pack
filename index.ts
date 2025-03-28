import  WolfPack, {TypeWolfpack } from './src/wolfpack.ts'

export function wolfPackCreate(pack: TypeWolfpack | TypeWolfpack[], update: boolean) {
	return WolfPack.getInstance(Array.isArray(pack) ? pack : [pack], update);
}
