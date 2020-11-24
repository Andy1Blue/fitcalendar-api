import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: console,
  });

  // TODO: Add CORS settings in the future
  //
  // const corsWhitelist = [
  //   'localhost',
  //   'http://localhost',
  //   'http://localhost:3000',
  //   'http://localhost:3001',
  // ];
  // const corsOptions = {
  //   origin: function (origin, callback) {
  //     if (corsWhitelist.indexOf(origin) !== -1) {
  //       console.log('allowed cors for:', origin);
  //       callback(null, true);
  //     } else {
  //       console.log('blocked cors for:', origin);
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: 'GET',
  //   credentials: true,
  //   allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  // };

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port = parseInt(process.env.PORT) || 3001;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
