//
import ReadFile from './helpers/read_file';

export default class DbManager<T> {
  fileName: String;

  constructor(fileName: String) {
    this.fileName = fileName;
  }

  public async get(): Promise<T[]> {
    const arrayT = await ReadFile(this.fileName);
    console.log('get async', arrayT);
    return [];
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
