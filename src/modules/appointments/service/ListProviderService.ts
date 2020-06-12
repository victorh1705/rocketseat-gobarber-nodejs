import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository<User>,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProvider({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProviderService;
