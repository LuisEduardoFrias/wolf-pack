import WolfPack, { TypeWolfpack } from './wolfpack.js'
import { alpha } from "./models/alpha.js";
import EventHandler from './helpers/event_handler.js'

function wolfPackCreate(pack: TypeWolfpack | TypeWolfpack[], update: boolean) {
  return WolfPack.getInstance(Array.isArray(pack) ? pack : [pack], update);
}

export { wolfPackCreate, alpha, EventHandler }