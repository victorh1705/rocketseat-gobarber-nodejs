import { container } from 'tsyringe';

import '@modules/users/providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentRepository<Appointment>>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUserRepository<User>>(
  'UserRepository',
  UserRepository,
);
