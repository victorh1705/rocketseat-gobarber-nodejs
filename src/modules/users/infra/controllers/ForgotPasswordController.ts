import { container } from 'tsyringe';
import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '@modules/users/service/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response) {
    const { email } = req.body;

    const forgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await forgotPasswordEmailService.execute({
      email,
    });

    return res.status(204).json();
  }
}
