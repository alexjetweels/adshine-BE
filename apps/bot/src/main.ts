import { BotModule } from './bot.module';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';
import { LoggerService } from 'libs/modules/logger/logger.service';
import { BotConfigService } from './bot-config/bot-config.service';
import { bold } from 'colorette';
import { createBotPolling, createBotWebhook } from './bot';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const appName = 'api-bot';
  const app = await NestFactory.create<NestExpressApplication>(
    BotModule,
    new ExpressAdapter(),
    // {
    //   bufferLogs: true,
    //   cors: true,
    // },
  );

  app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  app.use(compression());

  const loggerService = app.get(LoggerService);
  const configService = app.get(BotConfigService);

  app.use((req: Request, res: Response, next: NextFunction) => {
    loggerService.trace({
      message: 'request from Telegram',
      obj: {
        url: req.url,
        body: req.method === 'GET' ? req.query : req.body,
        method: req.method,
      },
    });
    next();
  });

  loggerService.setApplication(appName);
  app.useLogger(loggerService);

  if (configService.telegram.mode === 'webhook') {
    await createBotWebhook(app);
  } else if (configService.telegram.mode === 'polling') {
    await createBotPolling(app);
  } else {
    throw new Error('Not support bot mode.');
  }

  await app.listen(configService.application.PORT);
  loggerService.log(
    `🟢 ${appName} listening at ${bold(configService.application.PORT)} on ${bold(
      configService.application.NODE_ENV,
    )} 🟢\n`,
  );
}
bootstrap();
