import { Router } from 'express';

import CreateUser from '../service/CreateUser';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const createUser = new CreateUser();

  const { name, email, password } = req.body;

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

export default usersRouter;
