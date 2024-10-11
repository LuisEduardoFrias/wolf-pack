/**/
import RewriteFile from './helpers/rewrite_file.js';
import ReadFile from './helpers/read_file.js';
import { getValueOperator } from './helpers/get_value_operator.js';
import { getObject, setObject } from './helpers/getset.js';
import { Where } from './helpers/where.js';

export default class DbManager<T> {
  fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  public async get(whereOperation?: string | object, where?: object): Promise<T[]> {

    const dtObjects: T[] = getObject<T>(this.fileName, await ReadFile());

    if (!whereOperation && !where) return dtObjects;

    if (typeof whereOperation === "string") {

      let dtFilted: T[] = [];

      if (where) {
        dtFilted = Where(where, dtObjects);
      }

      return getValueOperator(dtFilted as T[], whereOperation);

    } else {
      return Where(whereOperation as object, dtObjects);
    }
  }
  //
  public async post(obj: T): Promise<T> | Promise<null> {
    const dbObject = await this.get();

    const fullDbObj = setObject<T>(this.fileName, obj, dbObject);

    const isRewrite = RewriteFile(fullDbObj);

    if (!isRewrite)
      return null;

    return obj as T;
  }
  //
  public async put(obj: T, where: object): Promise<T> | Promise<null> {
    const dbObject = await this.get();

    const props = Reflect.ownKeys(where as object);
    const index = dbObject.findIndex((dto: T) => {
      return props.every((prop: string) => { return dto[prop] === where[prop]; })
    }) as T[];

    if (index === -1) return null;

    dbObject[index] = obj;

    const isRewrite = RewriteFile(dbObject);

    if (!isRewrite)
      return null;

    return obj as T;
  }
  //
  public async delete(where: object): Promise<T> | null {
    console.log(`remove async ${id}`);
    return {};
  }
}

