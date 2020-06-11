import 'reflect-metadata';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@modules/users/service/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar from an user', async () => {
    const avatarFileName = 'avatar.png';

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName,
    });

    expect(user.avatar).toBe(avatarFileName);
  });

  it('should not be able to update avatar from an non existing user', async () => {
    const avatarFileName = 'avatar.png';

    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const avatarFileName = 'avatar.png';

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName,
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith(avatarFileName);
    expect(user.avatar).toBe('avatar2.png');
  });
});
