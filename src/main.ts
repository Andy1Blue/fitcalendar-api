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
  let app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: console,
  });

  if (process.env.MODE === 'PROD') {
    let httpsOptions = {};

    if (process.env.USE_CERT_DIR === 'true') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('fs');
      httpsOptions = {
        key: fs.readFileSync(process.env.KEY_DIR),
        cert: fs.readFileSync(process.env.CERT_DIR),
        ca: fs.readFileSync(process.env.CA_DIR),
      };
    }

    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ https: httpsOptions }),
      {
        logger: console,
      },
    );
  }

  const corsWhitelist = process.env.CORS_WHITELIST.split(',');
  const corsOptions = {
    origin: function (origin, callback) {
      if (corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log(`Not allowed by CORS ${origin}`);
        callback(new Error(`Not allowed by CORS ${origin}`));
      }
    },
    allowedHeaders:
      'token, x-www-form-urlencoded, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET, PUT, POST, DELETE, UPDATE, OPTIONS',
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  const port = parseInt(process.env.PORT) || 3001;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
