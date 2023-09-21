import { Bank } from "../../domain";

export class BankModel implements Bank {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  shortname: string;
  code: string;
  email: string;
  password: string;
  cnpj: string;
}
