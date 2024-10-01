//
export default class DbManager<T> {
  // 
  public async getAsync() {
    console.log('get async');
  }
  // 
  public async getByAsync(obj: T) {
    console.log(`get by async ${JSON.stringify(obj)}`);
  }
  // 
  public async postAsync(obj: T) {
    console.log(`post async ${JSON.stringify(obj)}`);
  }
  // 
  public async putAsync(obj: T) {
    console.log(`put async ${JSON.stringify(obj)}`);
  }
  // 
  public async deleteAsync(id: string | object) {
    console.log(`remove async ${id}`);
  }
}
