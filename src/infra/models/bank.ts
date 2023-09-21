import { Bank } from "../../domain";
import { Field, Id, Model } from "./common";

@Model("bank")
export class BankModel implements Bank {
  @Id()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  active: boolean;

  @Field()
  name: string;

  @Field()
  shortname: string;

  @Field()
  code: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  cnpj: string;
}
