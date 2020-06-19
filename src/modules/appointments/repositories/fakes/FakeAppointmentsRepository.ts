import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderIdDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderIdDTO';
import IFindAllInDayFromProviderIdDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderIdDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository
  implements IAppointmentRepository<Appointment> {
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    return this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderIdDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      a =>
        a.provider_id === provider_id &&
        getMonth(a.date) + 1 === month &&
        getYear(a.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    provider_id,
    year,
  }: IFindAllInDayFromProviderIdDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      a =>
        a.provider_id === provider_id &&
        getDate(a.date) === day &&
        getMonth(a.date) + 1 === month &&
        getYear(a.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
