import { Global, Module } from '@nestjs/common';
import { OneSignalService } from '../one-signal/one-signal.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [OneSignalService],
  exports: [OneSignalService],
})
export class OneSignalModule {}
