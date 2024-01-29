import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AggregatedResponse {
  @ApiProperty({
    example: '00000000-0000-0000-0000-000000005016',
    description: 'The product Id from the current set of data',
  })
  @IsString()
  @IsNotEmpty()
  itemNumber!: string;

  @ApiProperty({
    example: 'Chocolate Milkshake',
    description: 'The product name from the current set of data',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: '44.00',
    description:
      'The price recorded for the product in the current set of data',
  })
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @ApiProperty({
    example: 'Desserter',
    description:
      'The category recorded for the product in the current set of data',
  })
  @IsString()
  @IsNotEmpty()
  category!: string;
}
