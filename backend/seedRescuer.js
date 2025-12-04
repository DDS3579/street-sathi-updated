import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from './models/user.model.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB');
    
    const hashedPassword = await bcrypt.hash('rescuer12345', 12);
    
    // Create admin user
    const admin = await User.create({
      name: 'John Rescuer',
      email: 'rescuer@street.com', // Typo? Maybe you meant "admin"?
      phone: '0000000000', // Required field
      password: hashedPassword,
      role: 'rescuer', // Must match your admin check
      otp: 1234, // Admins don't need OTP verification
      requests: []
    });
    
    console.log('✅ Admin created successfully!');
    console.log('Login: admit@street.com');
    console.log('Password: projecthobhai123');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();