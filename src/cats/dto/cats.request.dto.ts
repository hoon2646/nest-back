import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from '../cats.schema';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {
  // Example swagger request body
}
