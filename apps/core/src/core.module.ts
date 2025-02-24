import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CacheModule } from 'libs/modules/cache/cache.module';
import { ClsModule } from 'libs/modules/cls/cls.module';
import { ConfigModule } from 'libs/modules/config/config.module';
import { LoggerModule } from 'libs/modules/logger/logger.module';
import { PrismaModule } from 'libs/modules/prisma/prisma.module';
import { QueueModule } from 'libs/modules/queue/queue.module';
import { RedlockModule } from 'libs/modules/redlock/redlock.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreConfigService } from './modules/config/core-config.service';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/users/user.module';
import { LogActionMiddleware } from 'libs/utils/middlewares/log-action.middleware';
import { InitDataModule } from 'libs/modules/init-data/init-data.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PermissionGroupsModule } from './modules/permission-groups/permission-groups.module';

const applications = [HealthModule, AuthModule, UserModule];

@Module({
  imports: [
    InitDataModule,
    LoggerModule,
    ConfigModule.register({
      envFilePath: './apps/core/.env',
      provider: [CoreConfigService],
      exports: [CoreConfigService],
    }),
    ClsModule,
    CacheModule,
    RedlockModule,
    QueueModule,
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          prismaOptions: {
            log: ['query', 'info', 'warn', 'error'],
          },
        };
      },
    }),
    ...applications,
    ProductsModule,
    OrdersModule,
    NotificationsModule,
    PermissionsModule,
    PermissionGroupsModule,
  ],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogActionMiddleware).forRoutes('*');
  }
}
