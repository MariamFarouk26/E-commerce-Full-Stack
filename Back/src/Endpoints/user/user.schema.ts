import mongoose from 'mongoose';

export let UserSchema = new mongoose.Schema({
  userID: Number,
  phone: String,
  name: String,
  address: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  isSeller: Boolean,
  isUser: Boolean,
  flag: Boolean,
  admit: Boolean,
  recent: [],
  sellerProducts: [],
  wishlist: [],
  checkout: [],
  cart: [],
  image: String,
});
