import 'reflect-metadata';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import ListProviderService from '@modules/appointments/service/ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProviderService: ListProviderService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviderService = new ListProviderService(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
