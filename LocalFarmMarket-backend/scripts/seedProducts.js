import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../src/models/Product.js';
import productsData from '../data/products.json' assert { type: 'json' };

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lmf_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany({});
    const products = await Product.insertMany(productsData);

    console.log(`${products.length} products seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();