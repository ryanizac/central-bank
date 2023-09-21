type GenericClass = new (...args: any[]) => any;

export function Model<Classe extends GenericClass>(name: string) {
  return function (ClassConstructor: Classe) {};
}
