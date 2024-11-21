import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => {
  return {
    enviorment: process.env.NODE_ENV,
  };
});
