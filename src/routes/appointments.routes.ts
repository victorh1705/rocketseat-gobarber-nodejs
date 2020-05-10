import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repository/AppointmentRepository';
import CreateAppointment from '../service/CreateAppointment';

const AppointmentsRouter = Router();

AppointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return res.json(appointments);
});

AppointmentsRouter.post('/', async (req, res) => {
  const createAppointment = new CreateAppointment();

  const { provider, date } = req.body;

  try {
    const appointment = await createAppointment.execute({ provider, date });

    return res.json(appointment);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default AppointmentsRouter;
