import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import AppointmentControllers from '@modules/appointments/infra/http/controllers/AppointmentControllers';

import ProvidersDayAvailabilityControllers from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityControllers';
import ProvidersMonthAvailabilityControllers from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityControllers';
import ProviderAppointmentControllers from '@modules/appointments/infra/http/controllers/ProviderAppointmentControllers';
import { celebrate, Joi, Segments } from 'celebrate';

const appointmentsRouter = Router();

const appointmentControllers = new AppointmentControllers();

const providerAppointmentControllers = new ProviderAppointmentControllers();
const providersDayAvailabilityControllers = new ProvidersDayAvailabilityControllers();
const providersMonthAvailabilityControllers = new ProvidersMonthAvailabilityControllers();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();
//
//   return res.json(appointments);
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentControllers.create,
);
appointmentsRouter.get('/me', providerAppointmentControllers.create);
appointmentsRouter.post(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providersMonthAvailabilityControllers.index,
);
appointmentsRouter.post(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providersDayAvailabilityControllers.index,
);

export default appointmentsRouter;
