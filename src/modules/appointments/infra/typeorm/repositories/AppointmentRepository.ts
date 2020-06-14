import { EntityRepository, getRepository, Raw, Repository } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderIdDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderIdDTO';
import IFindAllInDayFromProviderIdDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderIdDTO';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository implements IAppointmentRepository<Appointment> {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date },
    });

    return appointment || undefined;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderIdDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        data: Raw(
          dataFieldName =>
            `to_char(${dataFieldName}, 'MM-YYYY') = ${parsedMonth}-${year}`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    provider_id,
    year,
  }: IFindAllInDayFromProviderIdDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dataFieldName =>
            `to_char(${dataFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });
  }
}

export default AppointmentRepository;
