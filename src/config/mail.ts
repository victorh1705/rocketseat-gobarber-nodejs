interface IMailConfig {
  driver: 'ses' | 'ethereal';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'victorh1705@gmail.com',
      name: 'Victor Henrique',
    },
  },
} as IMailConfig;
