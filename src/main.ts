import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const port = process.env.PORT || 5500;
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(port, () => console.log(`App listening on port ${port}...`));
}
bootstrap();
