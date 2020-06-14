import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/service/ListProviderAppointmentService';

class ProviderAppointmentControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.body;

    const listProviderAppointmentService = container.resolve(
      ListProviderAppointmentService,
    );

    const providers = await listProviderAppointmentService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(providers);
  }
}

export default ProviderAppointmentControllers;
