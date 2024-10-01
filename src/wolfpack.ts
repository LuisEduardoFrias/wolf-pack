// 
'use strict';
import crypto from 'crypto';
//
import CreateFile from './create_file.js';
import SubwriteFile from './subwrite_file.js';
import Environment from './models/environment.js';
import ReadConfigFile from './readConfigFile.js';
import DbManager from './db_manager.js';
//
const { ENVIRONMENT, DB_NAME } = ReadConfigFile();

const isDebelopment: boolean = (ENVIRONMENT === Environment.production);
const fullDataConfiFile = `./ ${DB_NAME}.${isDebelopment ? 'db' : 'json'}`;

function wolfPackCreate(pack: any[], update: boolean = false) {
  return WolfPack.getInstance(pack, update);
}

class WolfPack {
  private static instance: WolfPack;
  private constructor() { }

  public static getInstance(wolves: any[], update: boolean): WolfPack {


    function initialice() {
      WolfPack.instance = new WolfPack();
      createFile(fullDataConfiFile);

      const files: object[] = [];

      wolves.forEach((classType: any) => {
        const instance = new classType(...[]);

        const uid = (crypto.randomUUID()).replace(/-/g, '');

        Reflect.set(
          WolfPack.instance,
          classType.name,
          new DbManager<typeof instance>()
        );

        createFile(uid);

        files.push({ key: uid, value: `${classType.name}` })
      })
      subwriteFile(fullDataConfiFile, files);
    }

    if (!WolfPack.instance) {
      initialice();
    }

    if (update) {
      initialice();
    }

    console.log(`Db created.`);
    return WolfPack.instance;

  }
};

export default wolfPackCreate;