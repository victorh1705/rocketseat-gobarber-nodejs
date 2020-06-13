import { getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
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
    const parsedDate = startOfHour(date);

    if (isBefore(parsedDate, Date.now())) {
      throw new AppError('You cannot create a appointment on a past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create a appointment for yourself');
    }

    if (getHours(date) < 8 && getHours(date) > 17) {
      throw new AppError(
        'You can only create an appointment between 8ap and 5pm',
      );
    }

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
