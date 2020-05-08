import { Router } from 'express';

import AppointmentRepository from '../repository/AppointmentRepository';
import CreateAppointment from '../service/CreateAppointment';

const appointmentsRoutes = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRoutes.get('/', (req, res) => {
  const appointments = appointmentRepository.all();

  return res.json(appointments);
});

appointmentsRoutes.post('/', (req, res) => {
  const createAppointment = new CreateAppointment(appointmentRepository);

  const { provider, date } = req.body;

  try {
    const appointment = createAppointment.execute({ provider, date });

    return res.json(appointment);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default appointmentsRoutes;
