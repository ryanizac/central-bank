import { CreateBank } from "../../domain";
import { BankRepository, IdGenerator } from "./ports";

export class SignUpUseCase implements CreateBank {
  private readonly idGenerator: IdGenerator;
  private readonly bankRepository: BankRepository;

  constructor({ idGenerator, bankRepository }: SignUpUseCase.Ports) {
    this.idGenerator = idGenerator;
    this.bankRepository = bankRepository;
  }

  async execute(args: CreateBank.Args): Promise<CreateBank.Result> {
    const { code, email, name, shortname, password, cnpj } = args;

    const dataInUse = await this.bankRepository.exists({
      cnpj,
      code,
      email,
      name,
      shortname,
    });

    const argsInUse: string[] = [];

    for (const key in dataInUse) {
      if (dataInUse[key as keyof typeof dataInUse] === true) {
        argsInUse.push(key);
      }
    }

    if (argsInUse.length > 0) {
      const keys = argsInUse.join(", ");
      throw new Error("The following data is already in use: " + keys);
    }

    const createdAt = new Date(),
      updatedAt = createdAt,
      active = false,
      id = this.idGenerator.generate();

    await this.bankRepository.create({
      id,
      createdAt,
      updatedAt,
      active,
      name,
      shortname,
      code,
      email,
      cnpj,
      password,
    });

    return {
      bank: {
        id,
        createdAt,
        updatedAt,
        active,
        name,
        shortname,
        code,
        email,
        cnpj,
      },
    };
  }
}

export namespace SignUpUseCase {
  export type Ports = {
    idGenerator: IdGenerator;
    bankRepository: BankRepository;
  };
}
