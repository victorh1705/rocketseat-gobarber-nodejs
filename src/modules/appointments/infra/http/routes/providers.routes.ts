import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import ProvidersControllers from '@modules/appointments/infra/http/controllers/ProvidersControllers';

const providersRouter = Router();
const providersControllers = new ProvidersControllers();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersControllers.index);

export default providersRouter;
