import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'pending' }, // pending, completed, failed
  transactionId: { type: String },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
});

export default mongoose.model('Payment', paymentSchema);
