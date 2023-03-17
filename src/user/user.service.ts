import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUserRepo } from './interfaces/user-repo.interface';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: IUserRepo,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy(id);
  }
}
