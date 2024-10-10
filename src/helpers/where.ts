/**/
export function Where<T>(where: object, dtObjcets: T[]): T[] {
  const props = Reflect.ownKeys(where as object);
  return dtObjcets.filter((dto: T) => {
    return props.every((prop: string) => { return dto[prop] === where[prop]; })
  })
}
