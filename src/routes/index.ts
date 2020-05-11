import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import UsersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', UsersRouter);

export default routes;
