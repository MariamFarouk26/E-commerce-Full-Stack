import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsEmpty,
} from 'class-validator';

export class CreateOrderDto {
  @IsEmpty()
  orderID?: number;
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  category: string[];
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userID: number;
  @IsNotEmpty()
  userEmail: string;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  totalPrice: number;
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  productID: number[];
}
