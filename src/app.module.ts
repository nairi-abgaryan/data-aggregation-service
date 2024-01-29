import { Module } from '@nestjs/common';
import { ScheduleTaskModule } from './modules/schedule/scheduleTask.module';
import { AggregationModule } from './modules/aggregation/aggregation.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CacheWrapperModule } from './modules/cache/cacheWrapper.module';
import { AggregationController } from './modules/aggregation/aggregation.controller';

@Module({
  imports: [
    ScheduleTaskModule,
    AggregationModule,
    TransactionModule,
    CacheWrapperModule,
  ],
  controllers: [AggregationController],
  providers: [],
})
export class AppModule {}
