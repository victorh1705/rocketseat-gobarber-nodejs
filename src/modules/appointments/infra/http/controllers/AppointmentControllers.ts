import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/service/CreateAppointmentService';

export default class AppointmentControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const createAppointment = container.resolve(CreateAppointmentService);

    const { provider, date } = req.body;

    const appointment = await createAppointment.execute({ provider, date });

    return res.json(appointment);
  }
}
