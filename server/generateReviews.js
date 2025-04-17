require('dotenv').config();
const mongoose = require('mongoose');
const User = require("./models/user"); 
const Reviews = require("./models/reviews")
const {faker} = require("@faker-js/faker")
require("./models/steamProfile")

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected successfully');
    return addRandomReviews('67f5467c94a4cef3b6e4e65f');
  })
  .then(() => {
    console.log('Task complited, disconnecting...');
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });

const generateRandomReviews = (gameId) => {
   return {
    gameId,
    userName: faker.person.firstName(),
    rating: Math.floor(Math.random() * 5) + 1,
    title: faker.lorem.words(3),
    description: faker.lorem.sentences(3),
    createdAt: faker.date.past()
   }
}

const addRandomReviews = async(userId) => {
  try {
    const user = await User.findById(userId).populate("steamProfile");
    const games = user.steamProfile.games.slice(0,10)
    for (let game of games) {
      const reviews = []
      for (let i = 0; i < 10; i++) {
        reviews.push(generateRandomReviews(game.appid))
      }
      await Reviews.create({ reviews });
     console.log(`Added ${reviews.length} reviews for game: ${game.name}`)
    }
    console.log("Random reviews added successfully")
  } catch (error) {
    console.log('Error fetching user:', error);
  }
} 


