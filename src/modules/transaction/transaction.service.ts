import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { CacheService } from '../cache/cache.service';
import { AggregatedTransaction } from '../aggregation/aggregation.service';

const readFileAsync = promisify(fs.readFile);

export interface Transaction {
  userId: string;
  amount: number;
  date: Date;
  id: string;
  createdAt: Date;
  type: 'payout' | 'spent' | 'earned' | 'paidOut';
}

@Injectable()
export class TransactionService {
  constructor(private readonly cacheService: CacheService) {}

  async fetchTransactions(): Promise<Transaction[]> {
    try {
      const filePath = path.join(__dirname, 'mockData', 'transactions.json');
      const rawData = await readFileAsync(filePath, 'utf8');
      const data = JSON.parse(rawData);
      return data.items as Transaction[];
    } catch (error) {
      console.error('Error reading mock transactions:', error);
      throw error;
    }
  }

  public async storeTransactions(transactions: Transaction[]): Promise<void> {
    const userAggregatedData: Record<string, AggregatedTransaction> =
      this.aggregateTransactions(transactions);

    for (const [userId, data] of Object.entries(userAggregatedData)) {
      await this.addUserIdToCache(userId);
      await this.mergeAndStoreUserData(userId, data);
    }
  }

  private aggregateTransactions(
    transactions: Transaction[],
  ): Record<string, AggregatedTransaction> {
    return transactions.reduce((acc, transaction) => {
      const { userId, type, amount } = transaction;
      const userData = acc[userId] || this.createNewAggregatedTransaction();

      this.updateAggregatedData(userData, type, amount);
      acc[userId] = userData;
      return acc;
    }, {});
  }

  private createNewAggregatedTransaction(): AggregatedTransaction {
    return { balance: 0, earned: 0, spent: 0, payout: 0, paidOut: 0 };
  }

  private updateAggregatedData(
    userData: AggregatedTransaction,
    type: string,
    amount: number,
  ): void {
    switch (type) {
      case 'earned':
        userData.earned += amount;
        userData.balance += amount;
        break;
      case 'spent':
        userData.spent += amount;
        userData.balance -= amount;
        break;
      case 'payout':
        userData.payout += amount;
        userData.balance -= amount;
        break;
      case 'paidOut':
        userData.paidOut += amount;
        break;
    }
  }

  private async addUserIdToCache(userId: string): Promise<void> {
    const userIds: Set<string> = new Set(
      (await this.cacheService.get('userIds')) || [],
    );
    userIds.add(userId);
    await this.cacheService.set('userIds', Array.from(userIds));
  }

  private async mergeAndStoreUserData(
    userId: string,
    newData: AggregatedTransaction,
  ): Promise<void> {
    const existingData: AggregatedTransaction = await this.cacheService.get(
      `aggregatedData_${userId}`,
    );
    const mergedData = existingData
      ? this.mergeUserData(existingData, newData)
      : newData;
    await this.cacheService.set(`aggregatedData_${userId}`, mergedData);
  }

  private mergeUserData(
    existingData: AggregatedTransaction,
    newData: AggregatedTransaction,
  ): AggregatedTransaction {
    return {
      balance: existingData.balance + newData.balance,
      earned: existingData.earned + newData.earned,
      spent: existingData.spent + newData.spent,
      payout: existingData.payout + newData.payout,
      paidOut: existingData.paidOut + newData.paidOut,
    };
  }
}
