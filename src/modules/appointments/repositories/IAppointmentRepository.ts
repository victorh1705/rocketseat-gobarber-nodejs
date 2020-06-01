import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentRepository<T> {
  findByDate(date: Date): Promise<T | undefined>;
  create(iCreateAppointmentDTO: ICreateAppointmentDTO): Promise<T>;
}
