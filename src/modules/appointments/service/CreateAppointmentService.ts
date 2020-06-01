import { parseISO, startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider: string;
  date: string;
}

class CreateAppointmentService {
  constructor(
    private appointmentRepository: IAppointmentRepository<Appointment>,
  ) {}

  async execute({ provider, date }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) throw new AppError('Time already scheduled');

    const appointment = await this.appointmentRepository.create({
      provider_id: provider,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
