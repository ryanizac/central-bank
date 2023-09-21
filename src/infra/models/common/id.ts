export function Id<Proto extends object, Attribute extends keyof Proto>() {
  return function (ClassPrototype: Proto, attribute: Attribute) {};
}
