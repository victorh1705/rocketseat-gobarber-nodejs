import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repository/AppointmentRepository';
import CreateAppointment from '../service/CreateAppointment';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const createAppointment = new CreateAppointment();

  const { provider, date } = req.body;

  const appointment = await createAppointment.execute({ provider, date });

  return res.json(appointment);
});

export default appointmentsRouter;
