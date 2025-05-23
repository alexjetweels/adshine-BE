import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AuthModule } from '../auth/auth.module';
import { OneSignalModule } from '../one-signal/one-signal.module';

@Module({
  imports: [AuthModule, OneSignalModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
