import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import AppointmentControllers from '@modules/appointments/infra/http/controllers/AppointmentControllers';

import ProvidersDayAvailabilityControllers from '@modules/appointments/infra/http/controllers/ProvidersDayAvailabilityControllers';
import ProvidersMonthAvailabilityControllers from '@modules/appointments/infra/http/controllers/ProvidersMonthAvailabilityControllers';

const appointmentsRouter = Router();
const appointmentControllers = new AppointmentControllers();
const providersDayAvailabilityControllers = new ProvidersDayAvailabilityControllers();
const providersMonthAvailabilityControllers = new ProvidersMonthAvailabilityControllers();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();
//
//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentControllers.create);
appointmentsRouter.post(
  '/:provider_id/month-availability',
  providersMonthAvailabilityControllers.index,
);
appointmentsRouter.post(
  '/:provider_id/day-availability',
  providersDayAvailabilityControllers.index,
);

export default appointmentsRouter;
