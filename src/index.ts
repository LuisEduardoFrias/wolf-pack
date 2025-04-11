import WolfPack, { TypeWolfpack } from './wolfpack.js'
import eventHandler from './helpers/event_handler.js';
import { alpha } from "./models/alpha.js";

function wolfPackCreate(pack: TypeWolfpack | TypeWolfpack[], update: boolean = false) {
  return WolfPack.getInstance(Array.isArray(pack) ? pack : [pack], update);
}

export { wolfPackCreate, alpha, eventHandler }