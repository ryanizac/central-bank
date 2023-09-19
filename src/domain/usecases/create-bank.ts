import { Account, Bank } from "../models";

export type CreateBank = {
  execute(args: CreateBank.Args): Promise<CreateBank.Result>;
};

export namespace CreateBank {
  export type Args = {
    name: string;
    shortname: string;
    code: string;
    account: Account;
    email: string;
    password: string;
  };

  export type Result = {
    bank: Omit<Bank, "password">;
  };
}
