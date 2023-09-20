import { Bank } from "../../../domain";

export type BankRepository = {
  exists(args: BankRepository.ExistsArgs): Promise<BankRepository.ExistsResult>;
  create(data: BankRepository.Data): Promise<void>;
};

export namespace BankRepository {
  export type ExistsArgs = Partial<{
    code: string;
    email: string;
    name: string;
    shortname: string;
    cnpj: string;
  }>;

  export type ExistsResult = Partial<Record<keyof ExistsArgs, boolean>>;

  export type Data = Bank;
}
