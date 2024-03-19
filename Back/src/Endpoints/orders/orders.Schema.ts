import mongoose from 'mongoose';

export let ordersSchema = new mongoose.Schema({
  orderID: Number,
  userID: Number,
  userEmail: String,
  totalPrice: Number,
  productID: [Number],
  category: [String],
});
