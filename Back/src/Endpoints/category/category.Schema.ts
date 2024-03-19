import mongoose from 'mongoose';

export let categorySchema = new mongoose.Schema({
  id: Number,
  category: String,
  subCategories: [String],
});
