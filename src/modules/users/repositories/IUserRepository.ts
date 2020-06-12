import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUserRepository<T> {
  findAllProvider(data: IFindAllProvidersDTO): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  findByEmail(email: string): Promise<T | undefined>;
  create(data: ICreateUserDTO): Promise<T>;
  save(data: User): Promise<T>;
}
