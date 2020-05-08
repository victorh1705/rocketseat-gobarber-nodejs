import { isEqual } from 'date-fns';
import Appointment from '../model/Appointment';

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface createAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const appointment = this.appointments.find(a => isEqual(date, a.date));

    return appointment || null;
  }

  public add({ provider, date }: createAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
