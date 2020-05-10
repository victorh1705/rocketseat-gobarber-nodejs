import { parseISO, startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repository/AppointmentRepository';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: string;
}

class CreateAppointment {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = getCustomRepository(AppointmentRepository);
  }

  async execute({
    provider,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) throw Error('Time already scheduled');

    const appointment = this.appointmentRepository.create({
      provider_id: provider,
      date: parsedDate,
    });

    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointment;
