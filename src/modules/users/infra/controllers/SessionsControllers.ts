import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/service/AuthenticateUserService';
import { Request, Response } from 'express';

export default class SessionsControllers {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authenticatedUser = await authenticateUserService.execute({
      email,
      password,
    });

    delete authenticatedUser.user.password;

    return res.json(authenticatedUser);
  }
}
