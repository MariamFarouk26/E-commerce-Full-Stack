import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateCategoryDto {
  id?: number;
  @IsNotEmpty()
  @IsString()
  category: string;
  @IsNotEmpty()
  @IsArray()
  subCategories: string[];
}
