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
export class CreateCommentDto {
  id?: number;
  @IsNotEmpty()
  status: string;
  
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  productID: Number;
  @IsNotEmpty()
  user: {
    name: string;

    image: any;

    address: string;

    email: string;

    password: string;

    phone: string;
    isAdmin: boolean;

    isSeller: boolean;

    isUser: boolean;

    admit: boolean;

    wishlist: [];

    sellerProducts: [];

    cart: [];

    checkout: [];

    recent: [];

    userID?: number;
    flag?: boolean;
  };
}
