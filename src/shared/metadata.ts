import "reflect-metadata";

export class Metadata<Data extends object> {
  set<K extends keyof Data>(Class: object, key: K, value: Data[K]) {
    Reflect.defineMetadata(key, value, Class);
  }

  get<K extends keyof Data>(Class: object, key: K): Data[K] | null {
    const value = Reflect.getMetadata(key, Class);
    return value;
  }
}
