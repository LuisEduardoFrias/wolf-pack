//
import ReadFile from './helpers/read_file.js';
import { getValueOperator } from './helpers/get_value_operator.js';
import { getObject, setObject } from './helpers/getset.js';

export default class DbManager<T> {
  fileName: String;

  constructor(fileName: String) {
    this.fileName = fileName;
  }

  public async get(whereOperation: string | object, where: object): Promise<T[]> {

    const dbObject = await ReadFile(this.fileName);
const value2 = getObject(this.fileName, dbObject);

    const value = getValueOperator([1, 2, 3, 4, 5], '1-2');

    console.log('get async', arrayT);
    return []
  }
  // 
  private async getWhere(where: T): Promise<T[]> {
    console.log(`get by async ${JSON.stringify(obj)}`);
    return [];
  }
  // 
  public async post(obj: T): Promise<T> | Promise<null> {
    console.log(`post async ${JSON.stringify(obj)}`);
    return obj;
  }
  // 
  public async put(obj: T): Promise<T> | Promise<null> {
    console.log(`put async ${JSON.stringify(obj)}`);
    return obj;
  }
  // 
  public async delete(where: object): Promise<T> | null {
    console.log(`remove async ${id}`);
    return {};
  }
}
