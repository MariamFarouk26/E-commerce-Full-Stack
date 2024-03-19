import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty } from 'class-validator';
export class UpdateCommentDto extends PartialType(CreateCommentDto) {
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
