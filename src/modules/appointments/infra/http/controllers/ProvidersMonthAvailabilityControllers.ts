import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMontlyAvailabilityService from '@modules/appointments/service/ListProviderMontlyAvailabilityService';

class ProvidersMonthAvailabilityControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.body;

    const listProviderMontlyAvailabilityService = container.resolve(
      ListProviderMontlyAvailabilityService,
    );

    const providers = await listProviderMontlyAvailabilityService.execute({
      provider_id,
      month,
      year,
    });

    return res.json(providers);
  }
}

export default ProvidersMonthAvailabilityControllers;
