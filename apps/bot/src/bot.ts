import { session, Bot as TelegramBot } from 'grammy';
import { hydrateReply, parseMode } from '@grammyjs/parse-mode';
import { webhookCallback } from 'grammy';
import { BotConfigService } from './bot-config/bot-config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { run } from '@grammyjs/runner';
import { LoggerService } from 'libs/modules/logger/logger.service';
import { MyContext } from './bot.context';
import { BotService } from './bot.service';
import { json, NextFunction, Request, Response } from 'express';
import { Agent } from 'https';

const createBot = async (
  configService: BotConfigService,
  botService: BotService,
) => {
  const bot = new TelegramBot<MyContext>(configService.telegram.botToken, {
    client: {
      timeoutSeconds: 1000000,
      apiRoot: 'https://api.telegram.org',
      baseFetchConfig: {
        compress: true,
        agent: new Agent({
          keepAlive: true,
        }),
      },
    },
  });

  bot.api.config.use(parseMode('HTML'));
  bot.use(hydrateReply);
  bot.use(
    session({
      getSessionKey: (ctx: MyContext) => {
        return ctx.chat?.id.toString();
      },
      initial: () => {
        return {};
      },
    }),
  );

  bot.api.setMyCommands([
    {
      command: 'start',
      description: 'launch your game',
    },
    {
      command: 'help',
      description: 'how to use',
    },
  ]);

  bot.command('start', (ctx) => botService.onStart(ctx));
  bot.command('help', (ctx) => botService.onHelp(ctx));
  bot.callbackQuery('help_how_to_earn', (ctx) => botService.onHowToEarn(ctx));
  bot.on('pre_checkout_query', (ctx) => {
    console.log('Pre checkout', ctx.from);
    //TODO Need check exist user and itemResource
    ctx
      .answerPreCheckoutQuery(true)
      .then(() => console.log('answer pre-checkout success'))
      .catch((error) => {
        console.log(error);
      });
  });
  bot.on('message:successful_payment', async (ctx) => {
    await botService.onSuccessfulPayment(ctx);
  });
  // Handle Web App Data
  bot.on('message', (ctx) => {
    if (ctx.message && ctx.message.web_app_data) {
      // Get the data sent from the Mini App
      const webAppData = ctx.message.web_app_data.data;

      // Respond to the user
      ctx.reply(`Received data from Mini App: ${webAppData}`);
    }
  });

  return bot;
};

export const createBotWebhook = async (app: NestExpressApplication) => {
  const configService = app.get(BotConfigService);
  const loggerService = app.get(LoggerService);
  const botService = app.get(BotService);

  const bot = await createBot(configService, botService);

  bot.catch((err: any) => {
    loggerService.trace(err);
    const ctx = err.ctx;
    const e = err.error;
    loggerService.error(e);
    ctx.reply('Sorry, please try after 5 minutes');
  });

  app.use(
    '/webhooks/telegram',
    json(),
    webhookCallback(bot, 'express', {
      secretToken: configService.telegram.botWebhookToken,
    }),
  );

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(500).send(error.message);
  });

  try {
    await bot.api.deleteWebhook();
    await bot.stop();
  } catch (error) {
    loggerService.warn({ message: error.message });
  }

  // to prevent receiving updates before the bot is ready
  await bot.init();

  // set webhook
  await bot.api.setWebhook(configService.telegram.botWebhook, {
    secret_token: configService.telegram.botWebhookToken,
    drop_pending_updates: true,
    allowed_updates: ['callback_query', 'message', 'pre_checkout_query'],
  });
  loggerService.log(
    `bot is running success. Bot info: ${bot.botInfo.username}`,
  );

  // Grace full shutdown
  const stopRunner = async () => {
    loggerService.log('shutdown');
    // await bot.api.deleteWebhook();
    // await bot.stop();
    process.exit(1);
  };
  process.once('SIGINT', stopRunner);
  process.once('SIGTERM', stopRunner);
};

export const createBotPolling = async (app: NestExpressApplication) => {
  const configService = app.get(BotConfigService);
  const loggerService = app.get(LoggerService);
  const botService = app.get(BotService);

  const bot = await createBot(configService, botService);

  // to prevent receiving updates before the bot is ready
  await bot.init();

  const runner = run(bot);
  loggerService.log(
    `bot is running success. Bot info: ${bot.botInfo.username}`,
  );

  // Grace full shutdown
  const stopRunner = () => {
    loggerService.log('shutdown');
    runner.isRunning() && runner.stop();
    process.exit(1);
  };
  process.once('SIGINT', stopRunner);
  process.once('SIGTERM', stopRunner);
};
