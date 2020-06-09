import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/service/ResetPasswordService';

export default class ResetPasswordController {
  public async create(req: Request, res: Response) {
    const { password, token } = req.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      token,
      password,
    });

    return res.status(204).json();
  }
}
