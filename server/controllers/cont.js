const { userModel } = require("../models/schema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
async function registerFunc(req, res) {
    try {
        const { newUsername, email, newpassword } = req.body;

        // Check if email is already registered
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ st: 400, message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        // Create a new user with the hashed password
        const user = await userModel.create({
            newUsername,
            email,
            newpassword: hashedPassword
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

// Login a user
async function loginFunc(req, res) {
    try {

        const { email, password } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ st: 400, message: "Invalid email or password" });
        }


        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.newpassword);
        if (!isMatch) {
            return res.status(400).send({ st: 400, message: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'hgdgdgdffsfsfvssjsjsjshhdhdduehehgeeeuehegeggeegegegegeg', // Replace with your actual secret key
            { expiresIn: '1h' } // Token expires in 1 hour
        );
console.log(token)
        // Set the JWT as an HTTP-only cookie
      
        // res.cookie('token', token, {
        //     httpOnly: true, // Makes the cookie inaccessible to JavaScript in the browser
        //     secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
        //     maxAge: 3600000 // 1 hour in milliseconds
        // });

        // Send the response
        res.status(200).send({st:200,jwt:token,message: "Login successful" });
    } catch (err) {
        console.error("message" + err.message);

        res.status(500).send({ st: 500, message: "Invalid email or password" });
    }
}

// Change password
async function changePasswordFunc(req, res) {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ st: 400, message: "User not found" });
        }

        // Check if the old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.newPassword);
        if (!isMatch) {
            return res.status(400).send({ st: 400, message: "Old password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.newPassword = hashedPassword;
        await user.save();

        res.status(200).send({ st: 200, message: "Password updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
}

// Delete account
async function deleteAccountFunc(req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ st: 400, message: "User not found" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.newPassword);
        if (!isMatch) {
            return res.status(400).send({ st: 400, message: "Password is incorrect" });
        }

        // Delete the user account
        await userModel.deleteOne({ email });

        res.status(200).send({ st: 200, message: "Account deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
}

// Sign out (delete JWT cookie)
async function signOutFunc(req, res) {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        });
        res.status(200).send({ st: 200, message: "Signed out successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
}

module.exports = {
    loginFunc,
    registerFunc,
    changePasswordFunc,
    deleteAccountFunc,
    signOutFunc
};
