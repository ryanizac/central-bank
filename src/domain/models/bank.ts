import { Account } from "./account";

export type Bank = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  shortname: string;
  code: string;
  email: string;
  password: string;
  account: Account;
};
