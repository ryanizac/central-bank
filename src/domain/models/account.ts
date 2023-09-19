export type Account = Account.Persoal | Account.Business;

export namespace Account {
  export type Persoal = {
    type: "personal";
    cpf: string;
  };

  export type Business = {
    type: "business";
    cnpj: string;
  };

  export type Type = Account["type"];
}
