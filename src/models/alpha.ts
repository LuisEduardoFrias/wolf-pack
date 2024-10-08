'use strict'

import { Relation } from "./relation.js";

type uid = `${string}-${string}-${string}-${string}-${string}`;
type Id = string | number | uid;

const addId = true;

export class alpha {
  id: Id;
  relation: Relation | null;

  constructor(idRelation?: Id | Relation, relation?: Relation) {
    if (idRelation) {
      if (typeof idRelation === 'object') {
        this.relation = idRelation;
      } else {
        this.id = idRelation;

        if (relation)
          this.relation = relation;
      }
    }
    else {
      if (addId)
        this.id = crypto.randomUUID();
    }
  }

  public json() {
    Reflect.set(this, "constructor", { name: this.constructor.name, });
    const _json: string = JSON.stringify(this);

    // delete this.constructor;
    return _json;
  }

  public parse(json: string) {
    this.mapper(JSON.parse(json));
  }

  // TODO validar las propiedades 
  public mapper(obj: object) {
    const keys = Reflect.ownKeys(obj);
    keys.forEach(key => {
      Reflect.set(this, key, Reflect.get(obj, key));
    });
  }

  static getInstance<T>(this: new (...args: any[]) => T, ...args: any[]): T {
    if (args.length === 0) {
      return new this();
    } else {
      return new this(...args);
    }
  }
} 
