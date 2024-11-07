import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

export default mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
