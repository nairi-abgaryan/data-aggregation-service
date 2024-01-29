import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'devSupport',
})
@ApiTags('DevSupport')
export class DevSupportController {
  @Get('health/check')
  @ApiOperation({
    summary: 'Health check endpoint',
  })
  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  async healthCheck(): Promise<void> {
    return;
  }
}
