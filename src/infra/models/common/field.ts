export function Field<Proto extends object, Attribute extends keyof Proto>() {
  return function (ClassPrototype: Proto, attribute: Attribute) {};
}
