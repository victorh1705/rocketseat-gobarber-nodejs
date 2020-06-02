import { Router } from 'express';
import UsersControllers from '@modules/users/infra/controllers/UsersControllers';
import UserAvatarControllers from '@modules/users/infra/controllers/UserAvatarControllers';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersControllers = new UsersControllers();
const avatarControllers = new UserAvatarControllers();

const upload = multer(uploadConfig);

usersRouter.post('/', usersControllers.create);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarControllers.update,
);

export default usersRouter;
