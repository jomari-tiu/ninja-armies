import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;
  @IsEnum(['stars', 'nunchucks'], { message: 'Invalid Weapon!' })
  weapon: 'stars' | 'nunchucks';
}
