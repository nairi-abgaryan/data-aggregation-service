import { Module } from '@nestjs/common';
import { AggregationController } from './aggregation.controller';
import { AggregationService } from './aggregation.service';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [AggregationController],
  providers: [AggregationService],
  exports: [AggregationService],
})
export class AggregationModule {}
