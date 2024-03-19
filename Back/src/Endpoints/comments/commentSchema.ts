import mongoose from 'mongoose';

export let commentSchema = new mongoose.Schema({
  id: Number,
  status: String,
  productID: Number,
  message: String,
  user: {
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
  },
});
