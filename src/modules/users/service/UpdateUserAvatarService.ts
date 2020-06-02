import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository<User>,
    @inject('StorageProvider')
    private iStorageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user)
      throw new AppError('Only authenticates users can change avatar', 401);

    if (user.avatar) {
      await this.iStorageProvider.deleteFile(user.avatar);
    }

    user.avatar = await this.iStorageProvider.saveFile(avatarFileName);

    await this.userRepository.save(user);

    return user;
  }
}
