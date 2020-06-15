import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/service/AuthenticateUserService';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

export default class SessionsControllers {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}
