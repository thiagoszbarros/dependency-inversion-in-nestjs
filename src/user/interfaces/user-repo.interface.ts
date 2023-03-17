import { User } from "../entities/user.entity";

export abstract class IUserRepo {
    abstract findAll(): Promise<User[]>;
    abstract findOneBy(id: number): Promise<User>;
}
