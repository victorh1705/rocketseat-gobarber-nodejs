import { Router } from 'express';

import CreateUser from '@modules/users/service/CreateUser';
import { container } from 'tsyringe';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const createUser = container.resolve(CreateUser);

  const { name, email, password } = req.body;

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

export default usersRouter;
