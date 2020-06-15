import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/service/CreateUserService';

export default class UsersControllers {
  public async create(req: Request, res: Response) {
    const createUser = container.resolve(CreateUserService);

    const { name, email, password } = req.body;

    const user = await createUser.execute({ name, email, password });

    return res.json(classToClass(user));
  }
}
