import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repository/AppointmentRepository';
import CreateAppointment from '../service/CreateAppointment';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return res.json(appointments);
});

appointmentsRoutes.post('/', async (req, res) => {
  const createAppointment = new CreateAppointment();

  const { provider, date } = req.body;

  try {
    const appointment = await createAppointment.execute({ provider, date });

    return res.json(appointment);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default appointmentsRoutes;
