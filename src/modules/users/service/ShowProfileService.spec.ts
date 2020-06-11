import 'reflect-metadata';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ShowProfileService from '@modules/users/service/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@example.com');
  });

  it('should not be able to show the profile from a non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'not-existing id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
