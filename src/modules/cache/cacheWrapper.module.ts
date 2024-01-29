import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    CacheModule.register({
      ttl: 24 * 60 * 60 * 1000,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [CacheService],
  exports: [CacheService],
})
@Global()
export class CacheWrapperModule {}
