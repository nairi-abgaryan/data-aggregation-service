import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService, TransactionType } from './transaction.service';
import { CacheService } from '../cache/cache.service';
import * as fs from 'fs';

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('TransactionService', () => {
  let service: TransactionService;
  let cacheService: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: CacheService, useValue: { get: jest.fn(), set: jest.fn() } },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    cacheService = module.get<CacheService>(CacheService);
  });

  describe('fetchTransactions', () => {
    it('should return an array of transactions', async () => {
      const mockData = JSON.stringify({});

      jest.spyOn(fs.promises, 'readFile').mockResolvedValue(mockData);
      const transactions = await service.fetchTransactions();
      expect(transactions).toHaveLength(6);
    });
  });

  describe('storeTransactions', () => {
    it('should store transactions and update cache', async () => {
      const mockTransactions = [
        {
          id: '41bbdf81-735c-4aea-beb3-3e5f433a30c5',
          userId: '074092',
          createdAt: '2023-03-16T12:33:11.000Z',
          type: TransactionType.PAYOUT,
          amount: 30,
        },
        {
          id: '41bbdf81-735c-4aea-beb3-3e5fasfsdfef',
          userId: '074092',
          createdAt: '2023-03-12T12:33:11.000Z',
          type: TransactionType.SPENT,
          amount: 1,
        },
        {
          id: '41bbdf81-735c-4aea-beb3-342jhj234nj234',
          userId: '074092',
          createdAt: '2023-03-15T12:33:11.000Z',
          type: TransactionType.EARNED,
          amount: 100,
        },
      ];

      jest.spyOn(cacheService, 'get').mockResolvedValue(null);
      jest.spyOn(cacheService, 'set').mockResolvedValue(undefined);

      await service.storeTransactions(mockTransactions);

      expect(cacheService.set).toHaveBeenCalled();
    });
  });
});
