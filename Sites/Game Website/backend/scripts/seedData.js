const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models (M)
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Blog = require('../models/Blog');
const Newsletter = require('../models/Newsletter');

// If you're using the all-in-one server.js file, you can define the schemas here instead

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/culinaryworld', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');

        // Clear existing data
        await User.deleteMany({});
        await Recipe.deleteMany({});
        await Blog.deleteMany({});
        await Newsletter.deleteMany({});

        // Create new users
        const hashedPassword = await bcrypt.hash('password123', 10);

        const user = await User.create([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                isSubscribed: true,
                subscriptionDate: new Date(),
                preferences: {
                    cuisineTypes: ['Italian', 'Mexican'],
                    dietaryRestrictions: ['Vegetarian'],
                    skillLevel: 'intermediate'
                }
            },
            {
               name: 'Emily Johnson',
               email: 'emily@example.com',
               password: hashedPassword,
               isSubscribed: true,
               subscriptionDate: new Date(),
               preferences: {
                   cuisineTypes: ['Asian', 'Mediterranean'],
                   dietaryRestrictions: ['gluten-free'],
                   skillLevel: 'advanced'
               }
            },
            {
                name: 'Sarah Lee',
                email: 'sarah@example.com',
                password: hashedPassword,
                isSubscribed: false,
                subscriptionDate: new Date(),
                preferences: {
                    cuisineTypes: ['American', 'French'],
                    dietaryRestrictions: [],
                    skillLevel: 'beginner'
                }
            }
        ]);

        console.log('Created sample users')

        // Create sample recipes
        const recipe = await Recipe.create({
            title: 'Classic Margherita Pizza',
            description: 'A traditional Italian pizza with mozzarella, tomatoes, and basil.',
            ingredients: [
              { name: 'Pizza dough', amount: '1', unit: 'ball'},
              { name: 'Tomato sauce', amount: '1/2', unit: 'cup'},
              { name: 'Fresh mozzarella', amount: '8', unit: 'oz'},  
              { name: 'Fresh basil leaves', amount: '1/2', unit: 'pieces'},
              { name: 'Olive oil', amount: '2', unit: 'tbsp'},
              { name: 'Salt and pepper', amount: 'to taste', unit: ''},
            ],
            instructions: [
                'Preheat the oven to 475°F (245°C).',
                'Roll out the pizza dough on a floured surface to your desired thickness.',
                'Spread the tomato sauce evenly over the dough, leaving a small border for the crust.',
                'Tear the fresh mozzarella into pieces and distribute it over the sauce.',
                'Add the fresh basil leaves on top.',
                'Drizzle with olive oil and season with salt and pepper.',
                'Bake in the preheated oven for 10-12 minutes, or until the crust is golden and the cheese is bubbly.',
                'Remove from the oven, let cool for a few minutes, then slice and serve.'
            ],
            
        });

        console.log('Sample data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
