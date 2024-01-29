import { Controller, Get, Param } from '@nestjs/common';
import { AggregationService } from './aggregation.service';

@Controller('aggregation')
export class AggregationController {
  constructor(private readonly aggregationService: AggregationService) {}

  @Get('payouts')
  async getListOfRequestedPayouts() {
    return await this.aggregationService.getListOfRequestedPayouts();
  }

  @Get('/:userId')
  async getAggregatedDataByUserId(@Param('userId') userId: string) {
    return await this.aggregationService.getAggregatedDataByUserId(userId);
  }
}
