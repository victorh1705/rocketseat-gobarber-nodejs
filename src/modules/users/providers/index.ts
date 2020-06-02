import { container } from 'tsyringe';
import IHashProvider from '@modules/users/providers/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/implementation/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
