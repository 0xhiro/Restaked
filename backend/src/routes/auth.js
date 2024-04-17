const express = require('express');
require('dotenv').config({path: '../../.env'})
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const User = require('../db/User');
const JWT_SECRET = process.env.JWT_SECRET;


const router = express.Router();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded;
        console.log('Authorization successful!')
        next();
    });
};

router.post('/signup', async (req, res) => {
    const { userEmail, password } = req.body;
    try {
        const user = new User({ userEmail, password });
        console.log(user)
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    const { userEmail, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ userEmail: userEmail });
        if (!user || !(await user.checkPassword(password))) {
            return res.status(401).send('Authentication failed');
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/change-password', authenticateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send('Old password is incorrect');
        }
       
        user.password = newPassword;
        await user.save();
        console.log(user.userId)

        console.log(user)
        res.send('Password successfully updated');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); 
        if (!user) return res.status(404).send('User not found');

        res.json({
            email: user.userEmail,
            subscriptionTier: user.subscriptionTier
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
