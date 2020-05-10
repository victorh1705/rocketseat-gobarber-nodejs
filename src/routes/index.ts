import { Router } from 'express';
import AppointmentsRouter from './appointments.routes';
import UsersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);
routes.use('/users', UsersRouter);

export default routes;
