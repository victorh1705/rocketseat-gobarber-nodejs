import { Router } from 'express';

import AuthenticateUserService from '@modules/users/service/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = container.resolve(AuthenticateUserService);

  const authenticatedUser = await authenticateUserService.execute({
    email,
    password,
  });

  delete authenticatedUser.user.password;

  return res.json(authenticatedUser);
});

export default sessionsRouter;
