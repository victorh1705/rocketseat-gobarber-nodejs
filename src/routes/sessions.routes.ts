import { Router } from 'express';

import AuthenticateUserService from '../service/AuthenticateUserService';

const SessionsRouter = Router();

SessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const authenticatedUser = await authenticateUserService.execute({
      email,
      password,
    });

    delete authenticatedUser.user.password;

    return res.json(authenticatedUser);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default SessionsRouter;
