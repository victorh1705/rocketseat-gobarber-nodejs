import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/service/CreateAppointmentService';

export default class AppointmentControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const createAppointment = container.resolve(CreateAppointmentService);

    const user_id = req.user.id;
    const { provider, date } = req.body;

    const appointment = await createAppointment.execute({
      provider_id: provider,
      user_id,
      date: new Date(date),
    });

    return res.json(appointment);
  }
}
