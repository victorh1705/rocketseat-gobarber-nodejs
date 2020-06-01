import { Router } from 'express';

import AuthenticateUserService from '@modules/users/service/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const userRepository = new UserRepository();
  const authenticateUserService = new AuthenticateUserService(userRepository);

  const authenticatedUser = await authenticateUserService.execute({
    email,
    password,
  });

  delete authenticatedUser.user.password;

  return res.json(authenticatedUser);
});

export default sessionsRouter;
