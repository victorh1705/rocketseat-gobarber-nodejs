import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderService from '@modules/appointments/service/ListProviderService';

class ProvidersControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const  user_id  = req.user.id;

    const listProviderService = container.resolve(ListProviderService);

    const providers = await listProviderService.execute({ user_id });

    return res.json(providers);
  }
}

export default ProvidersControllers;
