import { container } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import mailConfig from '@config/mail';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/container/providers/MailProvider/implementations/SESMailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
