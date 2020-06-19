import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderIdDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderIdDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderIdDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderIdDTO';

export default interface IAppointmentRepository<T> {
  findByDate(date: Date, provider_id: string): Promise<T | undefined>;
  create(iCreateAppointmentDTO: ICreateAppointmentDTO): Promise<T>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderIdDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderIdDTO,
  ): Promise<Appointment[]>;
}
