import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface AuthUserDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: AuthUserDTO): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) throw new Error('Incorrect email/password combination.');

    const passwordMatched = compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, '24f8b8b7e6913e898527b66516852f83', {
      subject: user.id,
      expiresIn: '30min',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
