import { Router } from 'express';
import ForgotPasswordControllers from '@modules/users/infra/controllers/ForgotPasswordControllers';
import ResetPasswordControllers from '@modules/users/infra/controllers/ResetPasswordControllers';
import { celebrate, Joi, Segments } from 'celebrate';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordControllers();
const resetPasswordController = new ResetPasswordControllers();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
