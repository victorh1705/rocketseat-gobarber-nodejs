import { parseISO, startOfHour } from 'date-fns';
import AppointmentRepository from '../repository/AppointmentRepository';
import Appointment from '../model/Appointment';

interface createAppointmentDTO {
  provider: string;
  date: string;
}

class CreateAppointment {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  execute({ provider, date }: createAppointmentDTO): Appointment {
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) throw Error('Time already scheduled');

    const appointment = this.appointmentRepository.add({
      provider,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointment;
