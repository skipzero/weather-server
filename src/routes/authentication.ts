import express from "express";
const router = express.Router();

import { User } from '../models/user';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ACCESS_SECRET } from '../utils/config'
const accessSecret = process.env.ACCESS_SECRET;
// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPW = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPW });
    await user.save();
    res.status(201).json({ message: 'User registration successful'})
  } 
  catch (err) {
    res.status(500).json({ message: 'Registration failed' })
  }
});

// User login...
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed'})
    }
    const pwMatch = await bcrypt.compare(password, user.password);
    if (!pwMatch) {
      res.status(401).json({ error: 'Authentication Failed!'})
    }
    const token = jwt.sign({ userId: user._id}, accessSecret, { expiresIn: '1h' })
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router;