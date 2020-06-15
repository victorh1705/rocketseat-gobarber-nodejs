import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository<User>,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    return this.userRepository.save(classToClass(user));
  }
}
