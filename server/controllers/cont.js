const { userModel } =require("../models/schema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerFunc(req, res) {
    try {
        const { newUsername, email, newPassword } = req.body;

        // Check if email is already registered
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ st: 400, message: "Email already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Create a new user with the hashed password
        const user = await userModel.create({
            newUsername,
            email,
            newPassword: hashedPassword
        });

        if (user) {
            return res.status(201).send({ st: 201, message: "User created successfully" });
        }

        // If the user is not created for some reason
        res.status(400).send({ st: 400, message: "User not created" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
}


async function loginFunc(req, res) {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ st: 400, message: "Invalid email or password" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.newPassword);
        if (!isMatch) {
            return res.status(400).send({ st: 400, message: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret_key', // Replace with your actual secret key
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Set the JWT as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript in the browser
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
            maxAge: 3600000 // 1 hour in milliseconds
        });

        // Send the response
        res.status(200).send({ st: 200, message: "Login successful" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
}



module.exports={
    loginFunc,registerFunc
};