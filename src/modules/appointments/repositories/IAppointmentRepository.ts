import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderIdDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderIdDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentRepository<T> {
  findByDate(date: Date): Promise<T | undefined>;
  create(iCreateAppointmentDTO: ICreateAppointmentDTO): Promise<T>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderIdDTO,
  ): Promise<Appointment[]>;
}
