import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/service/UpdateProfileService';
import ShowProfileService from '@modules/users/service/ShowProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response) {
    const user_id = req.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id });

    return res.json(user);
  }

  public async update(req: Request, res: Response) {
    const updateProfileService = container.resolve(UpdateProfileService);

    const user_id = req.user.id;
    const { name, email, old_password, password } = req.body;

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return res.json(classToClass(user));
  }
}
