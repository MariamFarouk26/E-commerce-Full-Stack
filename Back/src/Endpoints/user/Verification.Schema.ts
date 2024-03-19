import mongoose from 'mongoose';

export let verificationSchema = new mongoose.Schema({
  userId: Number,
  email: String,
  code: Number,
});
