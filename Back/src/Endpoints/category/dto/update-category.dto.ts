import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
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
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  id?: number;
  @IsNotEmpty()
  @IsString()
  category: string;
  @IsNotEmpty()
  @IsArray()
  subCategories: string[];
}
