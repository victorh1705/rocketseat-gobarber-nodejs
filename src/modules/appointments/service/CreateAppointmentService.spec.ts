import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/service/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: '2020-05-17T10:02',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create a new appointment at same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointmentService.execute({
      date: '2020-05-17T10:02',
      provider_id: '123123',
    });

    expect(
      createAppointmentService.execute({
        date: '2020-05-17T10:02',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
