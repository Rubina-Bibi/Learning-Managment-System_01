import User from '../models/User.js';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register logic
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

       
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // 2. secure Password  (hash) 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // 3. Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'student' 
        });

        // 4. Database mein save karein
        await user.save();

        res.status(201).json({ 
            message: "User registered successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ error: "Server Error: Registration failed" });
    }
};