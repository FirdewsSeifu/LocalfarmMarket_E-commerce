import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, default: '' },
  price: { type: Number, required: true },
  currency: { type: String, default: 'ETB' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  specifications: { type: Object },
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
