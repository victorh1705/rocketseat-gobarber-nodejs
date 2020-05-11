import { Router } from 'express';

import AuthenticateUserService from '../service/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();

  const authenticatedUser = await authenticateUserService.execute({
    email,
    password,
  });

  delete authenticatedUser.user.password;

  return res.json(authenticatedUser);
});

export default sessionsRouter;
