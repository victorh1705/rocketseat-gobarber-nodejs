import { ICreateNotificationDTO } from '@modules/notifications/dtos/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
