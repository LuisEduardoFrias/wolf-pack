import RewriteFile from './helpers/rewrite_file.js';
import ReadFile from './helpers/read_file.js';
import { getValueOperator } from './helpers/get_value_operator.js';
import { getProp, setProp } from './helpers/getset.js';
import { Where } from './helpers/where.js';
import EventHandler from './helpers/event_handler.js'
import { TypeFileStructure, TypeObject, TypeExternalObject, TypeEntityRef } from './models/type_file_structure.js'

class Validate<T extends TypeExternalObject>{
  dataFile: TypeFileStructure;
  newPropObject: T;
  prop: string;

  constructor(dataFile: TypeFileStructure, newPropObject: T, prop: string) {
    this.dataFile = dataFile;
    this.newPropObject = newPropObject;
    this.prop = prop;
  }
  //
  public validatePrimaryKey(): Validate<T> {
    const primaryKey: string = (this.dataFile.__data_config__[this.prop])?.primaryKey;
    const props: TypeObject[] = this.dataFile.data[this.prop];

    if (props && primaryKey) {
      props.forEach((prop: TypeObject) => {
        if (prop[primaryKey] === this.newPropObject[primaryKey as keyof T]) {
          const error = new Error(`La propiedad '${primaryKey}' con el valor '${prop[primaryKey]}', esta configurada como 'primaryKey' no pueden existir dublicados.`)
          throw error;
        }
      })
    }

    return this;
  }
  //
  public validateUnique(): Validate<T> {
    const uniques = (this.dataFile.__data_config__[this.prop])?.uniques;
    const props: TypeObject[] = this.dataFile.data[this.prop];

    if (props && uniques) {
      uniques.forEach((uniques: string) => {
        props.forEach((prop: TypeObject) => {
          if (prop[uniques] === this.newPropObject[uniques as keyof T]) {
            const error = new Error(`La propiedad '${uniques}' con el valor '${prop[uniques]}', esta configurada como 'uniques' no pueden existir dublicados.`)
            throw error;
          }
        })
      })
    }

    return this;
  }
  //
  public validateRef(): Validate<T> {
    const entityRefs = (this.dataFile.__data_config__[this.prop])?.entityRefs;

    if (entityRefs?.length > 0) {

      entityRefs.forEach((ref: TypeEntityRef) => {
        const refPk: string = (this.dataFile.__data_config__[ref.entity])?.primaryKey;

        if (refPk !== ref.primaryKey) {
          const error = new Error('discrepancias en la referecia entre foreignKey y primaryKey.');
          throw error;
        }

        const isEqual = (this.dataFile.data[ref.entity]).some((prop) =>
          prop[refPk] === this.newPropObject[ref.foreignKey as keyof T]);

        if (!isEqual) {
          const error = new Error(`No existe un valor para la referencia en '${ref.entity}'.`);
          throw error;
        }
      })
    }

    return this;
  }
  //
  public removeEntityConfig(): Validate<T> {


    if (this.newPropObject.entityConfig) {
      delete this.newPropObject.entityConfig;
    }

    return this;
  }
}

export default class DbManager<T> {
  fileName: string;
  prop: string;
  emit: string;

  constructor(fileName: string, prop: string) {
    this.fileName = fileName;
    this.prop = prop;
    this.emit = `${fileName}:${prop}`
  }

  public async get(whereOperation?: string | object, where?: object): Promise<T[] | null> {

    const propObjects: T[] | null = getProp<T>(this.prop, await ReadFile(this.fileName));

    if (!propObjects) return null;

    if (!whereOperation && !where) return propObjects;

    if (typeof whereOperation !== "string") {
      return Where<T>(whereOperation as object, propObjects);
    }

    let dtFilted: T[] = [];

    if (where) {
      dtFilted = Where<T>(where, propObjects);
    }

    return getValueOperator(dtFilted as T[], whereOperation);
  }
  //
  public async post(obj: T): Promise<T | null> {

    const { fileObject, dataObjects } = await this.validated(obj);
    const propObjects: T[] | null = getProp<T>(this.prop, fileObject);

    if (!propObjects) return null;

    propObjects.push(dataObjects as T);

    const _fileObject = setProp<T>(this.prop, propObjects, fileObject);

    RewriteFile(this.fileName, _fileObject);

    EventHandler.emit(`${this.fileName}:post`, propObjects)

    return dataObjects as T;
  }
  //
  public async put(obj: T, where: object): Promise<T | null> {

    const { fileObject, dataObjects } = await this.validated(obj);
    const propObjects: T[] | null = getProp<T>(this.prop, fileObject);

    if (!propObjects) return null;

    const props = Reflect.ownKeys(where as object);

    const index: number = propObjects.findIndex((dto: T) => {
      return props.every((prop) => dto[prop as keyof T] === where[prop as keyof object])
    });

    if (index === -1) return null;

    propObjects[index] = dataObjects as T;

    const _fileObject = setProp<T>(this.prop, propObjects, fileObject);

    RewriteFile(this.fileName, _fileObject);

    EventHandler.emit(`${this.fileName}:put`, propObjects)

    return dataObjects as T;
  }
  //
  public async delete(where: object): Promise<T | null> {
    const dataFile = await ReadFile(this.fileName);

    if (!dataFile) return null;

    const propConfig = (dataFile.__data_config__[this.prop]);
    const relationships = propConfig?.relationships;
    const primaryKey = propConfig?.primaryKey;
    const propObjects: T[] = dataFile.data[this.prop] as T[];

    const values = Reflect.ownKeys(where as object);

    const index: number = propObjects.findIndex((dto: T) =>
      values.every((value) =>
        dto[value as keyof T] === where[value as keyof object])
    );

    if (index === -1) return null;

    if (relationships) {
      const valuePrimaryKey = propObjects[index][primaryKey as keyof T];

      relationships.forEach((rs: string) => {
        const entityRefs = (dataFile.__data_config__[rs])?.entityRefs;
        const _props = dataFile.data[rs];

        if (_props.some((prop) =>
          entityRefs.some((entityRef) =>
            prop[entityRef.foreignKey as keyof TypeObject] === valuePrimaryKey
          )
        )) {
          return null;
        }
      })
    }

    propObjects.splice(index, 1);

    const fileObject = setProp<T>(this.prop, propObjects, dataFile);

    RewriteFile(this.fileName, fileObject);

    EventHandler.emit(`${this.fileName}:delete`, propObjects)

    return propObjects[index];
  }
  //
  private async validated(obj: T): Promise<{ fileObject: TypeFileStructure, dataObjects: TypeObject }> {
    const Validate_ = new Validate(await ReadFile(this.fileName), obj as TypeExternalObject, this.prop);

    Validate_
      .validatePrimaryKey()
      .validateUnique()
      .validateRef()
      .removeEntityConfig();

    return {
      fileObject: Validate_.dataFile,
      dataObjects: Validate_.newPropObject as TypeObject
    };
  }
}