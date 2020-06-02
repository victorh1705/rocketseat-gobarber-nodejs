import { container } from 'tsyringe';
import CreateUser from '@modules/users/service/CreateUser';
import { Request, Response } from 'express';

export default class UsersControllers {
  public async create(req: Request, res: Response) {
    const createUser = container.resolve(CreateUser);

    const { name, email, password } = req.body;

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  }
}
