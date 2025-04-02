export function Where<T>(where: object, dtObjcets: T[]): T[] {

	const props = Reflect.ownKeys(where as object);

	return dtObjcets.filter((dto: T) =>
		props.every((prop: string | symbol) =>
			dto[prop as keyof T] === Reflect.get(where,prop)
		)
	);
}
