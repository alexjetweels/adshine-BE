import { MyContext } from './bot.context';
import { Injectable, Logger } from '@nestjs/common';
import { BotConfigService } from './bot-config/bot-config.service';
import { User } from '@grammyjs/types';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);
  constructor(
    private readonly configService: BotConfigService,
    @InjectQueue('successful_payment_item') private queueBuyItem: Queue,
    @InjectQueue('successful_payment_exchange') private queueExchange: Queue,
  ) {}

  private gameName = '<strong>Game Weather</strong>';

  async onStart(ctx: MyContext) {
    const telegramUser = ctx.from!;
    const wellComeText = this.wellComeText(telegramUser);

    await ctx.replyWithPhoto(this.configService.telegram.wallpaperImage, {
      caption: wellComeText,
      reply_markup: {
        inline_keyboard: [
          [this.buttonFollowX(), this.buttonSubscribeTelegram()],
          [this.buttonPlayNow()],
        ],
      },
      parse_mode: 'HTML',
    });
  }

  async onHelp(ctx: MyContext) {
    const telegramUser = ctx.from!;

    return await ctx.reply(this.helpText(telegramUser), {
      reply_markup: {
        inline_keyboard: [
          [this.buttonFollowX(), this.buttonSubscribeTelegram()],
          [
            {
              text: 'How to earn money in game',
              callback_data: 'help_how_to_earn',
            },
          ],
          [this.buttonPlayNow()],
        ],
      },
      parse_mode: 'HTML',
    });
  }

  async onHowToEarn(ctx: MyContext) {
    await ctx.reply(this.guildText(), {
      reply_markup: {
        inline_keyboard: [
          [this.buttonFollowX(), this.buttonSubscribeTelegram()],
          [this.buttonPlayNow()],
        ],
      },
      parse_mode: 'HTML',
    });
  }

  async onSuccessfulPayment(ctx: MyContext) {
    const invoicePayload = JSON.parse(
      ctx.message?.successful_payment?.invoice_payload || '{}',
    );

    this.logger.log(
      'onSuccessfulPayment Payload: ' + JSON.stringify(invoicePayload, null, 2),
    );

    if (invoicePayload.type === 'buy_item') {
      this.queueBuyItem
        .add(
          'handleSuccessfulPayment',
          {
            payUserId: ctx.from?.id,
            successfulPayment: ctx.message?.successful_payment,
          },
          {
            timeout: 4000,
          },
        )
        .then((job) => {
          this.logger.log(
            'add to queue successful_payment_item success. Job: ' + job.id,
          );
        })
        .catch((error) => {
          this.logger.error(
            'add to queue successful_payment_item error',
            error,
          );
        });

      await ctx.reply('You are successful buy item');
      this.logger.log('reply success');
      return;
    }

    if (invoicePayload.type === 'exchange') {
      this.queueExchange
        .add(
          'handleSuccessfulPayment',
          {
            payUserId: ctx.from?.id,
            successfulPayment: ctx.message?.successful_payment,
          },
          {
            timeout: 4000,
          },
        )
        .then((job) => {
          this.logger.log(
            'add to queue successful_payment_exchange success. Job: ' + job.id,
          );
        })
        .catch((error) => {
          this.logger.error(
            'add to queue successful_payment_exchange error',
            error,
          );
        });
      await ctx.reply('You are successful exchange');
      this.logger.log('reply success');
      return;
    }
  }

  private mentionUser(name: string, id: number) {
    return `<a href="tg://user?id=${id}">${name}</a>`;
  }

  private buttonFollowX() {
    return {
      text: 'Follow X',
      url: new URL(this.configService.telegram.linkX).toString(),
    };
  }

  private buttonSubscribeTelegram() {
    return {
      text: 'Subscribe Channel',
      url: new URL(this.configService.telegram.linkTelegram).toString(),
    };
  }

  private buttonPlayNow() {
    return {
      text: '🎮 Play Now!',
      web_app: {
        url: new URL(this.configService.telegram.linkMiniApp).toString(),
      },
    };
  }

  private wellComeText(telegramUser: User) {
    const name = [
      telegramUser.username,
      telegramUser.first_name,
      telegramUser.last_name,
    ].find(Boolean) as string;

    return `
  🎊 Welcome ${this.mentionUser(name, telegramUser.id)}, be one of our members today! 🎊
Join ${this.gameName}, the mining Telegram app where you can <b>get airdropped daily</b>.
        
<b>CLAIM NOW and get $5-10 every day now!</b> 💸💸💸`;
  }

  private helpText(telegramUser: User) {
    const name = [
      telegramUser.username,
      telegramUser.first_name,
      telegramUser.last_name,
    ].find(Boolean) as string;
    return `
  Hello ${this.mentionUser(name, telegramUser.id)}! Welcome to ${this.gameName} 
You are now the director of a crypto exchange.
Which one? You choose. Tap the screen, collect coins, pump up your passive income, 
develop your own income strategy.
We’ll definitely appreciate your efforts once the token is listed (the dates are coming soon).
Don't forget about your friends — bring them to the game and get even more coins together!
        `;
  }

  private guildText() {
    return `
      How to play ${this.gameName}

💰 Tap to earn
Tap the screen and collect coins.

⛏ Mine
Upgrade cards that will give you passive income opportunities.

⏰ Profit per hour
The exchange will work for you on its own, even when you are not in the game for 3 hours.
Then you need to log in to the game again.

📈 LVL
The more coins you have on your coins, the higher the level of your exchange is and the faster you can earn more coins.

👥 Friends
Invite your friends and you’ll get bonuses. Help a friend move to the next leagues and you'll get even more bonuses.

🪙 Token listing
At the end of the season, a token will be released and distributed among the players.
Dates will be announced in our announcement channel. Stay tuned!

/help to get this guide
      `;
  }
}
