// server.js
import express from 'express';
import cors from 'cors';
import { connect, Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import axios from 'axios'; // Import Axios

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Use express.json() instead of destructuring json from express.


// Set up your MongoDB connection
connect('mongodb+srv://vicreno08:Marijuana08@renoxvi.fmmgxdd.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check if mongodb connection is successful
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('MongoDB connected successfully!');
});
db.on('disconnected', () => {
  console.log('MongoDB disconnected.');
});


// Define the User schema and model (you can adjust this based on your requirements)
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  paymentCode: { type: String, required: true },
});

const User = model('User', userSchema);

// Add your login and registration routes here


  app.post('/api/registration', async (req, res) => {
    try {
      const { email, password, paymentCode } = req.body;
      console.log('Received registration request:', email, paymentCode); // Add this line for logging
  
      // Add code to validate the payment code and handle the payment processing (e.g., M-Pesa integration).
     // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
      // After successful payment, create a new user in the database.
  
      const newUser = new User({ email, password, paymentCode });
      await newUser.save();
  
      console.log('Registration successful for:', email); // Add this line for logging
      res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Error occurred during registration:', error);
      res.status(500).json({ error: 'An error occurred during registration.' });
    }
  });
  






app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email and password match an existing user in the database.
      const user = await User.findOne({ email, password });
  
      if (!user) {
        return res.status(404).json({ error: 'Incorrect email or password.' });
      }
  
      // Check if the user has paid and their network package has not expired
      // Here, you would have to implement the logic to validate the user's payment and package status.
      // For this example, we'll use a dummy property "paid" to simulate the payment status.
      const paid = true; // Set this based on your payment verification logic
  
      if (!paid) {
        return res.status(403).json({ error: 'You have not paid. Please make a payment to access the internet.' });
      }
  
      // If the user exists, and the payment is successful, you can generate a token or session for authenticated access.
      // For simplicity, we'll just send a success message.
      res.status(200).json({ message: 'Login successful! You can now access the internet.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  