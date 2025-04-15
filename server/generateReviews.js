require('dotenv').config();
const mongoose = require('mongoose');
const User = require("./models/user"); // Assuming your User schema is defined here

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected successfully');
    // Call the function after the connection is established
    addRandomReviews('67f5467c94a4cef3b6e4e65f');
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });

// Function to find user by ID and log the user
async function addRandomReviews(userId) {
  try {
    const user = await User.findById(userId);
    console.log('User found:', user); // Log the user object
  } catch (error) {
    console.log('Error fetching user:', error);
  }
} 
