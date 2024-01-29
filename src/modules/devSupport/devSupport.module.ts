import { Module } from '@nestjs/common';
import { DevSupportController } from './devSupport.controller';

@Module({
  imports: [],
  controllers: [DevSupportController],
  providers: [],
  exports: [],
})
export class DevSupportModule {}
