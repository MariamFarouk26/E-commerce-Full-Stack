import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

export class verifycationCode {
  @IsNotEmpty()
  @IsNumber()
  public code: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;
}
