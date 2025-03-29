import WolfPack, { TypeWolfpack } from './wolfpack.js'
export { alpha, Id } from "../src/models/alpha.js";

export function wolfPackCreate(pack: TypeWolfpack | TypeWolfpack[], update: boolean) {
	return WolfPack.getInstance(Array.isArray(pack) ? pack : [pack], update);
}
