import { MyContext } from './bot.context';
import { Injectable, Logger } from '@nestjs/common';
import { BotConfigService } from './bot-config/bot-config.service';
import { User } from '@grammyjs/types';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);
}
