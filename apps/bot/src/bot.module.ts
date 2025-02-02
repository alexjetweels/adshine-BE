import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { ConfigModule } from 'libs/modules/config/config.module';
import { LoggerModule } from 'libs/modules/logger/logger.module';
import { BotConfigService } from './bot-config/bot-config.service';
import { BotService } from './bot.service';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from 'libs/modules/queue/queue.module';

@Module({
  imports: [
    LoggerModule,
    QueueModule,
    BullModule.registerQueue({ name: 'successful_payment_item' }),
    BullModule.registerQueue({ name: 'successful_payment_exchange' }),
    ConfigModule.register({
      envFilePath: './apps/bot/.env',
      provider: [BotConfigService],
      exports: [BotConfigService],
    }),
    ClsModule,
  ],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
