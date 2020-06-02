import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/providers/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository<User>,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) throw new AppError('Email already registered');

    const hashedPassword = await this.hashProvider.generateHash(password);

    return this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

export default CreateUserService;
