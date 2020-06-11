import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import ProfileController from '@modules/users/infra/controllers/ProfileControllers';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
