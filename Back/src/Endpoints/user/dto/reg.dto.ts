import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class regDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string;

  @IsNotEmpty()
  public image: any;

  @IsNotEmpty()
  @IsString()
  public address: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  public phone: string;
  @IsNotEmpty()
  public isAdmin: boolean;
  @IsNotEmpty()
  @IsBoolean()
  public isSeller: boolean;

  @IsBoolean()
  @IsNotEmpty()
  public isUser: boolean;
  @IsBoolean()
  @IsNotEmpty()
  public admit: boolean;

  @IsArray()
  @IsNotEmpty()
  public wishlist: [];
  @IsArray()
  @IsNotEmpty()
  public sellerProducts: [];

  @IsArray()
  @IsNotEmpty()
  public cart: [];

  @IsArray()
  @IsNotEmpty()
  public checkout: [];

  @IsArray()
  @IsNotEmpty()
  public recent: [];

  @IsEmpty()
  public userID?: number;
  @IsEmpty()
  public flag?: boolean;
}
