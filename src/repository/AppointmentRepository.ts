import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface createAppointmentDTO {
  provider: string;
  date: Date;
}

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointment = await this.findOne({
      where: { date },
    });

    return appointment || null;
  }
}

export default AppointmentRepository;
