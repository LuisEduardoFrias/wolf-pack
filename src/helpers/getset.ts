/**/
export function getObject<T>(objectName: string, object: object): Array<T> { return object[objectName] };

export function setObject<T>(objectName: string, object: T, dbObject: object): object {
  dbObject[objectName] = object;
  return dbObject;
};
