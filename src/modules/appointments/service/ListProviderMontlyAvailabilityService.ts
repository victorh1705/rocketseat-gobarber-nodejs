import { inject, injectable } from 'tsyringe';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllFromProviderIdDTO from '@modules/appointments/dtos/IFindAllFromProviderIdDTO';
import { getDate, getDaysInMonth } from 'date-fns';

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMontlyAvailabilityService {
  constructor(
    @inject('AppointmentIAppointmentRepository')
    private appointmentIAppointmentRepository: IAppointmentRepository<
      Appointment
    >,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IFindAllFromProviderIdDTO): Promise<IResponse> {
    const appointments = await this.appointmentIAppointmentRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    console.log(appointments);

    const daysInMonth = getDaysInMonth(new Date(year, month + 1));

    const eachDayArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMontlyAvailabilityService;
