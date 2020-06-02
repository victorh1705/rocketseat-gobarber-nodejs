import { container } from 'tsyringe';
import CreateUserService from '@modules/users/service/CreateUserService';
import { Request, Response } from 'express';

export default class UsersControllers {
  public async create(req: Request, res: Response) {
    const createUser = container.resolve(CreateUserService);

    const { name, email, password } = req.body;

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  }
}
