import mongoose from 'mongoose';

export let ProductsSchema = new mongoose.Schema({
  id: Number,
  price: Number,
  sold: Number,
  ratings: Number,
  quantity: Number,
  title: String,
  description: String,

  subcategory: String,
  brand: String,
  category: String,
  images: [String],
  comments: [
    {
      userName: String,
      Comment: String,
      userEmail: String,
      userID: Number,
      ratings: Number,
    },
  ],
  substitutes: [{}],
  boycott: Boolean,
});
