import { Router } from 'express';

import CreateUser from '@modules/users/service/CreateUser';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const userRepository = new UserRepository();
  const createUser = new CreateUser(userRepository);

  const { name, email, password } = req.body;

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

export default usersRouter;
