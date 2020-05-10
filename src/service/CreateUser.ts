import { getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUser {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const userWithSameEmail = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export default CreateUser;
