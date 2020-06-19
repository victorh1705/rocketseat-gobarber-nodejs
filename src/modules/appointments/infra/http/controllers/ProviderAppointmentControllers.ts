import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/service/ListProviderAppointmentService';
import { classToClass } from 'class-transformer';

class ProviderAppointmentControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.query;

    const listProviderAppointmentService = container.resolve(
      ListProviderAppointmentService,
    );

    const providers = await listProviderAppointmentService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(providers));
  }
}

export default ProviderAppointmentControllers;
