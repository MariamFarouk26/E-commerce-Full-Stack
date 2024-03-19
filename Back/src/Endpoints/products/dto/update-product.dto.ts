import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsEmpty,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  public id?: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  public ratings: number;
  @IsNumber()
  @IsNotEmpty()
  public quantity: number;
  @IsNumber()
  public sold: number;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public price: number;
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  public category: string;
  @IsNotEmpty()
  @IsString()
  public brand: string;
  @IsNotEmpty()
  @IsBoolean()
  public boycott: boolean;

  @IsString()
  @IsNotEmpty()
  public subcategory: string;
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  public images: string[];
  @IsArray()
  substitutes: {}[];
  @IsArray()
  public comments: {
    ratings: number;
    userName: string;
    Comment: string;
    userEmail: string;
    userID: number;
    Date?: Date;
  }[];
}
