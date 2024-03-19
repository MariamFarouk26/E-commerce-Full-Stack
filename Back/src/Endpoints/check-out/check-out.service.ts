import { Injectable } from '@nestjs/common';
import { CreateCheckOutDto } from './dto/create-check-out.dto';
import { UpdateCheckOutDto } from './dto/update-check-out.dto';

@Injectable()
export class CheckOutService {
  create(createCheckOutDto: CreateCheckOutDto) {
    return 'This action adds a new checkOut';
  }

  findAll() {
    return `This action returns all checkOut`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkOut`;
  }

  update(id: number, updateCheckOutDto: UpdateCheckOutDto) {
    return `This action updates a #${id} checkOut`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkOut`;
  }
}
// import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
// import { Response } from 'express';
// import { Stripe } from 'stripe'; // Assuming you have installed the Stripe package

// @Controller('payment')
// export class PaymentController {
//   private readonly stripe: Stripe;

//   constructor() {
//     // Initialize Stripe with your API key
//     this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//       apiVersion: '2020-08-27', // Ensure to use the latest API version
//     });
//   }

//   @Post('checkout')
//   async handleCheckout(@Body() cartData: any, @Res() res: Response) {
//     try {
//       // Calculate the total amount to charge based on the cart data
//       const totalAmount = calculateTotal(cartData);

//       // Create a new Stripe Checkout session
//       const session = await this.stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price_data: {
//               currency: 'usd', // Change currency based on your requirement
//               product_data: {
//                 name: 'Your Product Name', // Set your product name
//               },
//               unit_amount: totalAmount, // Total amount to charge in cents
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: ${process.env.FRONTEND_URL}/success, // Redirect URL after successful payment
//         cancel_url: ${process.env.FRONTEND_URL}/cancel, // Redirect URL if the payment is canceled
//       });

//       // Respond with the session ID to the frontend
//       return res.status(HttpStatus.OK).json({ sessionId: session.id });
//     } catch (error) {
//       // Handle any errors and respond with an error message
//       console.error('Error processing payment:', error.message);
//       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error processing payment' });
//     }
//   }

//   // Helper function to calculate the total amount
//   private calculateTotal(cartData: any): number {
//     // Implement your logic to calculate the total amount based on the cart data
//     // For simplicity, you can sum the prices of all items in the cart
//     // Ensure to handle edge cases and validate the input data
//   }
// }
