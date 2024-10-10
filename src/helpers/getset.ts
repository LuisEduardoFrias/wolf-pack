/**/
export function getObject<T>(objectName: string, dbObject: object): Array<T> {
  return dbObject[objectName] as Array<T>;
};

export function setObject<T>(objectName: string, object: T, dbObject: object): object {
  dbObject[objectName] = object;
  return dbObject;
};
