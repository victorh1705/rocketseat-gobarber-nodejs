import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IHashProvider from '@modules/users/providers/models/IHashProvider';
import { addHours, differenceInHours, isAfter } from 'date-fns';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  password: string;
  token: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository<User>,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User does not exists');

    const user = await this.userRepository.findById(userToken?.user_id);

    if (!user) throw new AppError('User does not exists');

    const tokenCreated = userToken.created_at;
    const compareDate = addHours(tokenCreated, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired');

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
