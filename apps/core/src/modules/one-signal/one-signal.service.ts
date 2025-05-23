// src/onesignal/onesignal.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import {
  UserNotificationRedirectType,
  UserNotificationType,
} from 'libs/utils/enum';
import { ApiException } from 'libs/utils/exception';
import * as OneSignal from 'onesignal-node';
import { CreateNotificationBody } from 'onesignal-node/lib/types';

@Injectable()
export class OneSignalService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  private client: OneSignal.Client;
  private readonly logger = new Logger(OneSignalService.name);

  private readonly appId = process.env.ONESIGNAL_APP_ID || ''; // App ID
  private readonly apiKey = process.env.ONESIGNAL_API_KEY || ''; // App REST API key
  private readonly memberTag = `adshine_memberId`;

  onModuleInit() {
    this.client = new OneSignal.Client(this.appId, this.apiKey);
  }

  chunkArray(myArray: number[], chunkSize: number) {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      let myChunk = myArray.slice(index, index + chunkSize);
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  async sendNotification(
    title: string,
    content: string,
    memberIds: number[],
    params: {
      type: UserNotificationType;
      redirectType?: UserNotificationRedirectType;
      redirectId?: any;
    },
  ) {
    const redirectId = (params.redirectId?.toString() as string) || '0';
    await this.prismaService.userNotification.createMany({
      data: memberIds.map((memberId) => ({
        userId: memberId,
        title,
        content,
        type: params.type,
        redirectType: params.redirectType,
        redirectId: redirectId,
      })),
    });

    const memberIdChunk = this.chunkArray(memberIds, 100);
    for (let memberIdsItem of memberIdChunk) {
      const filters = [] as any;
      memberIdsItem.forEach((x) => {
        if (filters.length > 0) {
          filters.push({
            operator: 'OR',
          });
          filters.push({
            field: 'tag',
            key: this.memberTag,
            relation: '=',
            value: x,
          });
        } else {
          filters.push({
            field: 'tag',
            key: this.memberTag,
            relation: '=',
            value: x,
          });
        }
      });
      const notification: CreateNotificationBody = {
        headings: {
          en: title,
          ja: title,
          vi: title,
        },
        contents: {
          en: content,
          ja: content,
          vi: content,
        },
        data: {
          customKey: 'customValue',
        },
        filters,
      };

      try {
        const response = await this.client.createNotification(notification);
        this.logger.log('OneSignal SDK response:', response.statusCode);
        return response;
      } catch (error) {
        this.logger.error('OneSignal SDK error:', error);
        throw new ApiException('Failed to send notification via OneSignal');
      }
    }
  }
}
