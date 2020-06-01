import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUser {
  constructor(private userRepository: IUserRepository<User>) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) throw new AppError('Email already registered');

    const hashedPassword = await hash(password, 8);

    return this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

export default CreateUser;
