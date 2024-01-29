import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async get<T>(cacheKey: string): Promise<T> {
    const cachedResult = await this.cacheManager.get<T>(cacheKey);
    if (cachedResult !== undefined) {
      return cachedResult;
    }

    return null;
  }

  public async set<T>(cacheKey: string, data: T, ttl?: number): Promise<T> {
    await this.cacheManager.set(cacheKey, data, ttl);

    return data;
  }
}
