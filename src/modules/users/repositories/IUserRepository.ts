import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUserRepository<T> {
  findById(id: string): Promise<T | undefined>;
  findByEmail(email: string): Promise<T | undefined>;
  create(data: ICreateUserDTO): Promise<T>;
  save(data: User): Promise<T>;
}
