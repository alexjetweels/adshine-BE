import { Injectable } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { ConfigService } from 'libs/modules/config/config.service';

class TelegramBotConfigDto {
  @IsString()
  botToken: string;

  @ValidateIf((o) => o.mode === 'webhook')
  @IsString({
    message: 'botWebhook is required when mode is "webhook"',
  })
  botWebhook: string;

  @ValidateIf((o) => o.mode === 'webhook')
  @IsString({
    message: 'botWebhookToken is required when mode is "webhook"',
  })
  botWebhookToken: string;

  @IsString()
  @IsIn(['webhook', 'polling'], {
    message: 'TELEGRAM_BOT_MODE must be either "webhook" or "polling"',
  })
  mode: 'webhook' | 'polling';

  @IsString()
  @IsOptional()
  @Expose()
  @Transform(
    ({ value }) =>
      value ||
      'https://i.ibb.co/ZM74fBt/DALL-E-2024-10-16-23-04-37-A-mysterious-and-classic-themed-game-wallpaper-titled-Golbin-Miners-The-s.webp',
  )
  wallpaperImage: string;

  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => value || 'https://x.com')
  linkX: string;

  @IsString()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => value || 'https://t.me')
  linkTelegram: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  linkMiniApp: string;
}

@Injectable()
export class BotConfigService extends ConfigService {
  telegram: TelegramBotConfigDto;

  constructor() {
    super();
    this.telegram = {
      ...this.validateConfig(TelegramBotConfigDto, {
        botToken: this.getOrThrow('TELEGRAM_BOT_TOKEN'),
        mode: this.getOrThrow('TELEGRAM_BOT_MODE'),
        botWebhook: this.get('TELEGRAM_BOT_WEBHOOK', { infer: true }) as string,
        botWebhookToken: this.get('TELEGRAM_BOT_WEBHOOK_TOKEN', {
          infer: true,
        }) as string,
        wallpaperImage: this.get('TELEGRAM_BOT_WALLPAPER') as string,
        linkX: this.get('LINK_X') as string,
        linkTelegram: this.get('LINK_TELEGRAM') as string,
        linkMiniApp: this.getOrThrow('TELEGRAM_MINI_APP'),
      }),
    };
  }
}
