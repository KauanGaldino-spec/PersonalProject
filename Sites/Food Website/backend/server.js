const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Contact form rate limiting
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many contact form submissions, please try again later.'
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/culinaryworld', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected');
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minLength: 6 },
    isSubscribed: { type: Boolean, default: false },
    subscriptionDate: { type: Date },
    preferences: {
        cuisineTypes: [String],
        dietaryRestrictions: [String],
        skillLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
    }
}, { timestamps: true });

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    ipAddress: String
}, { timestamps: true });

// Recipe Schema
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    ingredients: [{
        name: { type: String, required: true },
        amount: { type: String, required: true },
        unit: String
    }],
    instructions: [{ type: String, required: true }],
    prepTime: { type: String, required: true }, // in minutes
    cookTime: { type: String, required: true }, // in minutes
    servings: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    cuisine: { type: String, required: true },
    tags: [String],
    nutritionInfo: {
        calories: Number,
        protein: Number,
        fat: Number,
        fiber: Number
    },
    imageUrl: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        review: String,
        createdAt: { type: Number, default: Date.now }
    }],
    averageRating: { type: Number, default: 0},
    totalRatings: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

// Blog Post Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: {
        name: { type: String, required: true },
        avatar: String,
        bio: String
    },
    category: { type: String, required: true },
    tags: [String],
    imageUrl: String,
    readTime: { type: Number, required: true }, // in minutes
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

}, { timestamps: true });

// Newsletter Schema
const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    isActive: { type: Boolean, default: true },
    preferences: {
        frequency: {type: String, enum: ['daily', 'weekly', 'monthly'], default: 'weekly' },
        topics: [String]
    }
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);
const BlogPost = mongoose.model('BlogPost', blogSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' })

        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid access token' })
            }
            req.user = user
            next()
        });
    };

    // ROUTES


    // Health check
    app.get('/api/health', (req, res) => {
        res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    // Contact form submission
    app.post('/api/contact', contactLimiter, async (req, res) => {
        try {
            const {name, email, } = req.body;

            // Validation
            if (!name || !email || !message) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            // Save to database
            const contact = new Contact({
                name,
                email,
                message,
                ipAddress: req.ip
            });

            await contact.save();

            //Send notification email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                subject: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
                html: `
                   <h3>New Contact Form Submission</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong></p>
                   <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                `
            };
            
            await transporter.sendMail(mailOptions);

            // Send confirmation email to user
            const confirmationMail = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Thank you for contacting CulinaryWorld!',
                html: `
                       <h3>Thank you for your message, ${name}!</h3>
                       <p>We've received your message and will get back to you within 24 hours.</p>
                       <p>Best regards,<br>The CulinaryWorld Team</p>
                `
            };

            await transporter.sendMail(confirmationMail);

            res.status(201).json({ message: 'Message sent successfully' });
        } catch (error) {
            console.error('Contact form error:', error);
            res.status(500).json({ message: 'Server error. Please try again later.' });

        }
    });

    // NewsLetter subscription
    app.post('/api/newsletter/subscribe', async (req, res) => {
        try {
            const { email, preferences } = req.body;

            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            // Check if already subscribed
             const existingSubscriber = await Newsletter.findOne({ email });
             if (existingSubscriber ) {
                if (existingSubscriber.isActive) {
                    return res.status(400).json({ message: 'Already subscribed' });
                } else {
                    // Reactivate subscription
                    existingSubscriber.isActive = true;
                    existingSubscriber.preferences = preferences || existingSubscriber.preferences;
                    await existingSubscriber.save();
                }
             } else {
                // New subscription
                const newsletter = new Newsletter({
                    email,
                    preferences: preferences || { frequency: 'weekly', topics: [] }
                });
                await newsletter.save();
             }

             // Send welcome email
             const welcomeEmail = {
                 from: process.env.EMAIL_USER,
                 to: email,
                 subject: 'Welcome to CulinaryWorld!',
                 html: `
                        <h2>Welcome to CulinaryWorld!</h2>
                        <p>Thank you for subscribing to our newsletter. You'll receive the latest recipes, cooking tips, and food trends directly in your inbox.</p>
                        <p>Happy cooking!</p>
                        <p>The CulinaryWorld Team</p>
                 `
             };

             await transporter.sendMail(welcomeEmail);

             res.status(201).json({ message: 'Subscribed successfully' });
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            res.status(500).json({ message: 'Server error. Please try again later.' });
        }
   });

   // Get featured recipes
   app.get('/api/recipes/featured', async (req, res) => {
    try {
        const recipes = await Recipe.find({
          ispublished: true,
          isFeatured: true
        })
        .limit(6)
        .sort({ createdAt: -1 })
        .populate('author', 'name');

        res.json(recipes);
    } catch (error) {
        console.error('Error fetching featured recipes:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }

   });

   // Get all recipes with pagination and filters
   app.get('/api/recipes', async (req, res) => {
     try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Build filter object
        const filter = { isPublished: true };

        if (req.query.cuisine) {
            filter.cuisine = { $regex: req.query.cuisine, $options: 'i' };
        }

        if (req.query.difficulty) {
            filter.difficulty = req.query.difficulty;
        }

        if (req.query.tags) {
            const tags = req.query.tags.split(',');
            filter.tags = { $in: tags };
        }

        if (req.query.maxPrepTime) {
            filter.prepTime = { $lte: parseInt(req.query.maxPrepTime) };
        }

        // Sort options
        let sort = { createdAt: -1 }; // Default sort by newest
        if (req.query.sort === 'rating') {
            sort = { averageRating: -1 };
        } else if (req.query.sort === 'prepTime') {
            sort = { prepTime: 1 };
        }

        const recipes = await Recipe.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate('author', 'name');

        const total = await Recipe.countDocuments(filter);

        res.json({
            recipes,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecipes: total
        });
    } catch (error) {
        console.error('Recipes fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch recipes' });
    }
});

// Get single recipe
app.get('/api/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
          .populate('author', 'name')
          .populate('ratings.user', 'name');

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Get blog posts
app.get('/api/blogs', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        const filter = { isPublished: true };

        if (req.query.category) {
          filter.category = req.query.category;
    }

    const posts = await Blog.find(filter)
     .sort({ createdAt: -1 })
     .skip(skip)
     .limit(limit);

    const total = await Blog.countDocuments(filter);

    res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total
    });
   } catch (error) {
       console.error('Error fetching blog posts:', error);
       res.status(500).json({ message: 'Server error. Please try again later.' });
   }
});

// Get featured blog posts
app.get('/api/blogs/featured', async (req, res) => {
   try {
     const posts = await Blog.find({
        isPublished: true,
        isFeatured: true
     })
     .limit(3)
     .sort({ createdAt: -1 });
     
     res.json(posts);
   } catch (error) {
       console.error('Error fetching featured blog posts:', error);
       res.status(500).json({ message: 'Server error. Please try again later.' });
   }
});

// Get single blog post
app.get('/api/blog/:id', async (req, res) => {
    try {
        const post = await blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Increment view count
        post.view = (post.view ) ||
        await post.save();

        res.json(post);

    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// User registration
app.get('/api/auth/register', async (req, res) => {
    try {
        const { name, email, passoword } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }   

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ message: 'User registered successfully', token,
            user: {
                id: newUser._id,
                name: user.name,
                email: newUser.email,
                isSubscribed: user.isSubscribed
                
            }
         });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // find user
        const user = User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );  

        res.json({ 
            message: 'Login successful', 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isSubscribed: user.isSubscribed
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

}

module.exports = app;
