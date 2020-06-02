import { Router } from 'express';
import SessionsControllers from '@modules/users/infra/controllers/SessionsControllers';

const sessionsRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionsRouter.post('/', sessionsControllers.create);

export default sessionsRouter;
