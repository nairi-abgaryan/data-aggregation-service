import { Module } from '@nestjs/common';
import { ScheduledTaskService } from './scheduledTask.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [ScheduleModule.forRoot(), TransactionModule],
  controllers: [],
  providers: [ScheduledTaskService],
  exports: [],
})
export class ScheduleTaskModule {}
