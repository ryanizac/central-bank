import "reflect-metadata";
import { ModelMetadata } from "./metadata";

export function Field<Proto extends object, Attribute extends keyof Proto>() {
  return function (ClassPrototype: Proto, attribute: Attribute) {
    if (typeof attribute !== "string") {
      throw new Error("The metadata key must be a string");
    }

    let type: ModelMetadata.FieldType;
    const Type = Reflect.getMetadata("design:type", ClassPrototype, attribute);

    if (Type === String) {
      type = "string";
    } else if (Type === Number) {
      type = "number";
    } else if (Type === Boolean) {
      type = "boolean";
    } else if (Type === Date) {
      type = "date";
    } else {
      throw new Error("The type of field " + attribute + " is invalid");
    }

    ModelMetadata.setField({
      ClassPrototype,
      attribute,
      type,
    });
  };
}
