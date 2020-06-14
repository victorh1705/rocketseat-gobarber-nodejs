import { Router } from 'express';
import SessionsControllers from '@modules/users/infra/controllers/SessionsControllers';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsControllers.create,
);

export default sessionsRouter;
