import { Router } from 'express';
import CreateAppointmentService from '@modules/appointments/service/CreateAppointmentService';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();
//
//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
  const createAppointment = container.resolve(CreateAppointmentService);

  const { provider, date } = req.body;

  const appointment = await createAppointment.execute({ provider, date });

  return res.json(appointment);
});

export default appointmentsRouter;
