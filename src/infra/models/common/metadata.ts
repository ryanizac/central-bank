import { Metadata } from "../../../shared";

export class ModelMetadata {
  private static readonly metadata: Metadata<ModelMetadata.Data> =
    new Metadata();

  static setModel({ Class, name }: ModelMetadata.SetModelOptions) {
    this.metadata.set(Class, "model", name);
  }

  static setId<Proto extends object>({
    ClassPrototype,
    attribute,
  }: ModelMetadata.SetIdOptions<Proto>) {
    if (typeof attribute !== "string") {
      throw new Error("The id attribute must be a string key");
    }

    this.metadata.set(ClassPrototype, "id", attribute);
  }

  static setField<Proto extends object>({
    ClassPrototype,
    attribute,
    type,
  }: ModelMetadata.SetFieldOptions<Proto>) {
    if (typeof attribute !== "string") {
      throw new Error("The attribute must be a string");
    }

    const newField: ModelMetadata.Field = {
      key: attribute,
      type,
    };

    this.metadata.set(ClassPrototype, "fields", (prev) => [...prev, newField]);
  }
}

export namespace ModelMetadata {
  export type FieldType = "string" | "number" | "boolean" | "date";

  export type Field = {
    key: string;
    type: FieldType;
  };

  export type Data = {
    /**
     * The name of model
     */
    model: string;
    /**
     * The attribute that represents id
     */
    id: string;
    /**
     * The fields of class
     */
    fields: Field[];
  };

  export type Class = {
    new (...args: any[]): any;
  };

  export type SetModelOptions = {
    Class: Class;
    name: string;
  };

  export type SetIdOptions<Proto extends object> = {
    ClassPrototype: Proto;
    attribute: keyof Proto;
  };

  export type SetFieldOptions<Proto extends object> = {
    ClassPrototype: Proto;
    attribute: keyof Proto;
    type: FieldType;
  };
}
