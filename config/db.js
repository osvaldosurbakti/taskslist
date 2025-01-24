const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/login-app'); // Hapus opsi yang tidak relevan
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Keluar jika terjadi error
  }
};

module.exports = connectDB;
