/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CheckOutService } from './check-out.service';
// import { CreateCheckOutDto } from './dto/create-check-out.dto';
import { UpdateCheckOutDto } from './dto/update-check-out.dto';
import { Response } from 'express';
import { Stripe } from 'stripe'; // Assuming you have installed the Stripe package

@Controller('check-out')
export class CheckOutController {
  private readonly stripe: Stripe;

  // constructor(private readonly checkOutService: CheckOutService) {}

  constructor(private readonly checkOutService: CheckOutService) {
    //     // Initialize Stripe with your API key
    this.stripe = new Stripe(
      'sk_test_51Orn7u09EgVYJWmOcYZzwwxxNStaeMJNuCIQZNHlrCJ9qeq7jCEB39OWz7F23TYk6f3N7DY5us6EKdZ6msAEWIXl00EwNe6Ga9',
      {
        apiVersion: '2023-10-16', // Ensure to use the latest API version
      },
    );
  }
  @Post('checkout')
  async handleCheckout(
    @Body()
    cartData: {
      products: any;
      subtotal: any;
      total: any;
    },
    @Res() res: Response,
  ) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1OuZRG09EgVYJWmOI6VjNp97' },
          { shipping_rate: 'shr_1OuZSp09EgVYJWmOndajMQvk' },
        ],
        line_items: cartData.products.map((item) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
                images: [item.images[0]],
              },
              unit_amount:
                cartData.subtotal === cartData.total
                  ? item.price * 100
                  : item.price * 50,
            },
            quantity: item.quantity,
          };
        }),
        success_url: 'http://localhost:3000/success', // Redirect URL after successful payment
        cancel_url: 'http://localhost:3000/cart', // Redirect URL if the payment is canceled
      });
      // Respond with the session ID to the frontend
      return res.status(HttpStatus.OK).json({ sessionId: session.id });
    } catch (error) {
      // Handle any errors and respond with an error message
      console.error('Error processing payment:', error.message);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Error processing payment' });
    }
  }

  @Get()
  findAll() {
    return this.checkOutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkOutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckOutDto: UpdateCheckOutDto,
  ) {
    return this.checkOutService.update(+id, updateCheckOutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkOutService.remove(+id);
  }
}
