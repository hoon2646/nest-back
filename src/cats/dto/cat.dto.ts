import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// PickType 사용할 타입만 고를 수 있음.
// OmitType 제외할 타입만 고를 수 있음.
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: 'abc',
    description: 'id',
  })
  id: string;
}
