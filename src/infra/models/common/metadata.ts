import { Metadata } from "../../../shared";

export class ModelMetadata {
  private static readonly metadata: Metadata<ModelMetadata.Data> =
    new Metadata();

  static setModel({ Class, name }: ModelMetadata.SetModelOptions) {
    this.metadata.set(Class, "model", name);
  }
}

export namespace ModelMetadata {
  export type Data = {
    /**
     * The name of model
     */
    model: string;
  };

  export type Class = {
    new (...args: any[]): any;
  };

  export type SetModelOptions = {
    Class: Class;
    name: string;
  };
}
