import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

export interface AggregatedTransaction {
  balance: number;
  earned: number;
  spent: number;
  payout: number;
  paidOut: number;
}

@Injectable()
export class AggregationService {
  constructor(private readonly cacheService: CacheService) {}

  async getAggregatedDataByUserId(userId: string): Promise<any> {
    const aggregatedDataKey = `aggregatedData_${userId}`;
    const aggregatedData = await this.cacheService.get(aggregatedDataKey);

    return (
      aggregatedData || {
        balance: 0,
        earned: 0,
        spent: 0,
        payout: 0,
        paidOut: 0,
      }
    );
  }

  async getListOfRequestedPayouts(): Promise<
    Array<{ userId: string; totalPayout: number }>
  > {
    const userIds: string[] = await this.cacheService.get('userIds'); // Method to retrieve all user IDs from the cache
    const payouts = [];

    for (const userId of userIds) {
      const userData: AggregatedTransaction = await this.cacheService.get(
        `aggregatedData_${userId}`,
      );
      if (userData) {
        payouts.push({ userId, totalPayout: userData.payout });
      }
    }

    // Aggregating payouts by userId
    const aggregatedPayouts = payouts.reduce((acc, payout) => {
      if (acc[payout.userId]) {
        acc[payout.userId].totalPayout += payout.totalPayout;
      } else {
        acc[payout.userId] = payout;
      }
      return acc;
    }, {});

    return Object.values(aggregatedPayouts);
  }
}
