import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TransactionService } from '../transaction/transaction.service';
const EVERY_12_SECONDS = '*/12 * * * * *';

@Injectable()
export class ScheduledTaskService {
  constructor(private transactionService: TransactionService) {}

  @Cron(EVERY_12_SECONDS) // Transaction API is called every 12 seconds. 5 calls per minute
  async fetchAndStoreTransactions() {
    try {
      const transactions = await this.transactionService.fetchTransactions();
      console.log('Fetched Transactions:', transactions);

      await this.transactionService.storeTransactions(transactions);
      console.log('Transactions stored in the cache:', transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }
}
