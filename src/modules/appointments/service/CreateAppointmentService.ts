import { parseISO, startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository<Appointment>,
  ) {}

  async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) throw new AppError('Time already scheduled');

    const appointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
