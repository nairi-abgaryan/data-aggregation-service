import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CacheWrapperModule } from '../cache/cacheWrapper.module';

@Module({
  imports: [CacheWrapperModule],
  controllers: [],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
