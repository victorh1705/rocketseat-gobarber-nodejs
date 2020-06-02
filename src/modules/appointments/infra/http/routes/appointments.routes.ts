import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import AppointmentControllers from '@modules/appointments/infra/http/controllers/AppointmentControllers';

const appointmentsRouter = Router();
const appointmentControllers = new AppointmentControllers();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();
//
//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentControllers.create);

export default appointmentsRouter;
