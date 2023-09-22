import "reflect-metadata";

export class Metadata<Data extends object> {
  private isFunction<T>(value: any): value is Metadata.CallbackSet<T> {
    return typeof value === "function";
  }

  set<K extends keyof Data>(
    Class: object,
    key: K,
    valueOrCallbackSet: Metadata.SetValue<Data[K]>,
  ) {
    let value: Data[K];

    if (this.isFunction<Data[K]>(valueOrCallbackSet)) {
      let currentValue = Reflect.getMetadata(key, Class);

      if (currentValue === undefined) {
        currentValue = [];
      }

      value = valueOrCallbackSet(currentValue);
    } else {
      value = valueOrCallbackSet;
    }

    Reflect.defineMetadata(key, value, Class);
  }

  get<K extends keyof Data>(Class: object, key: K): Data[K] | null {
    const value = Reflect.getMetadata(key, Class);
    return value;
  }
}

export namespace Metadata {
  export type CallbackSet<T> = (prev: T) => T;

  export type SetValue<T> = T | CallbackSet<T>;
}
