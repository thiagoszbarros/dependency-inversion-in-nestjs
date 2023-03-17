import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  constructor(
    user?: Partial<User>
  ) {
    this.id = user?.id;
    this.email = user?.email;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}
