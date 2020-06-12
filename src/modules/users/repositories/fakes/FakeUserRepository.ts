import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUserRepository implements IUserRepository<User> {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  public async findAllProvider({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) users = this.users.filter(u => u.id !== except_user_id);

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(u => u.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUserRepository;
