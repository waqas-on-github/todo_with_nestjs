import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT), // Convert string to number
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    databaseName: process.env.DATABASE_NAME,
    autoLoadEntities: process.env.DATABASE_SYNC === 'true' ? true : false, // in prod db sync shou be false to avoid database overRidng
    synchronize: process.env.DATABASE_LOAD === 'true' ? true : false,
  };
});
