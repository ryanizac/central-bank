import { BankRepository as IBankRepository } from "../../data";
import { Bank } from "../../domain";
import { db } from "./common";

export class BankRepository implements IBankRepository {
  async create(data: Bank): Promise<void> {
    await db.bank.create({
      data: {
        id: data.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        active: data.active,
        name: data.name,
        shortname: data.shortname,
        code: data.code,
        email: data.email,
        password: data.password,
        cnpj: data.cnpj,
      },
    });
  }

  async exists({
    code,
    email,
    name,
    shortname,
    cnpj,
  }: IBankRepository.ExistsArgs): Promise<IBankRepository.ExistsResult> {
    const founds = await db.bank.findMany({
      where: {
        OR: [{ code }, { email }, { name }, { shortname }, { cnpj }],
      },
      select: {
        code: true,
        email: true,
        name: true,
        shortname: true,
        cnpj: true,
      },
    });

    const find = <
      K extends keyof T,
      V extends T[K],
      T = (typeof founds)[number],
    >(
      key: K,
      value?: V,
    ) => {
      if (value === undefined) {
        return undefined;
      }

      return !!founds.find((item) => (item as T)[key as keyof T] === value);
    };

    return {
      code: find("code", code),
      email: find("email", email),
      name: find("name", name),
      shortname: find("shortname", shortname),
      cnpj: find("cnpj", cnpj),
    };
  }
}
