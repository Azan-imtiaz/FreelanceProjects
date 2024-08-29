const { userModel,otpModel } = require("../models/schema");
const nodemailer = require('nodemailer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




// Generate random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// Send OTP to user's email
async function sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
        from: 'testazan123@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp},It will be Expired in 10 minutes.`
    };

    await transporter.sendMail(mailOptions);
}

// Register endpoint
async function registerFunc(req, res) {
    try {
        const { newUsername, email, newpassword } = req.body;

        // Check if email is already registered
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ st: 400, message: "Email already exists" });
        }

        // Generate OTP
        const otp = generateOTP();

        // Store OTP temporarily (you may choose to store it in a different way)
        await otpModel.create({ email, otp, newUsername, newpassword });

        // Send OTP email
        await sendOTPEmail(email, otp);

        return res.status(200).send({ st: 200, message: "OTP sent to email" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
}



// Verify OTP and create user endpoint
async function verifyOTPFunc(req, res) {
    try {
        const { email, otp } = req.body;

        // Find the OTP entry
        const otpEntry = await otpModel.findOne({ email, otp });
        if (!otpEntry) {
            return res.status(400).send({ st: 400, message: "Invalid OTP" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(otpEntry.newpassword, 10);

        // Create the user
        const user = await userModel.create({
            newUsername: otpEntry.newUsername,
            email,
            newpassword: hashedPassword
        });

        // Delete OTP entry after successful registration
        await otpModel.deleteOne({ email, otp });

        if (user) {
            return res.status(201).send({ st: 201, message: "User created successfully" });
        } else {
            res.status(400).send({ st: 400, message: "User not created" });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
}


// // Register a new user
// async function registerFunc(req, res) {
//     try {
//         const { newUsername, email, newpassword } = req.body;

//         // Check if email is already registered
//         const existingUser = await userModel.findOne({ email });

//         if (existingUser) {
//             return res.status(400).send({ st: 400, message: "Email already exists" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(newpassword, 10);

//         // Create a new user with the hashed password
//         const user = await userModel.create({
//             newUsername,
//             email,
//             newpassword: hashedPassword
//         });

//         if (user) {
//             return res.status(201).send({ st: 201, message: "User created successfully" });
//         }

//         // If the user is not created for some reason
//         res.status(400).send({ st: 400, message: "User not created" });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send({ st: 500, message: "Internal server error" });
//     }
// }

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
            { expiresIn: '10h' } // Token expires in 1 hour
        );
        // Set the JWT as an HTTP-only cookie
      
        res.cookie('token', token, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript in the browser
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
            maxAge: 3600000 // 1 hour in milliseconds
        });

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
    const {  confirmPassword, newPassword,oldPassword } = req.body;
    if(!confirmPassword || !newPassword || !oldPassword){
        return res.status(400).send({ st: 400, message: "Enter all fields" });
    }
    const token = req.cookies.token;
    // Verify the JWT token to get the email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     
    if (decoded) {
      // Extract email from decoded token
      const email = decoded.email;

      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).send({ st: 400, message: "User not found" });
      }

    const check =await bcrypt.compare(oldPassword,user.newpassword);
    if(!check){
        return res.status(400).send({ st: 400, message: "Enter the correct old password." });
    }
      // Check if the confirmPassword and newPassword are the same
      if (confirmPassword != newPassword) {
        
        return res.status(400).send({ st: 400, message: "Both passwords should be same." });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.newpassword= hashedPassword;
      await user.save();

      // Send success response
      return res.status(200).send({ st: 200, message: "Password updated successfully" });
    } else {
       
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        });
      return res.status(401).send({ st: 401, message: "Invalid token" });
    }
  } catch (err) {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0
    });
    res.status(500).send({ st: 500, message: "Invalid token" });
  }
}


  // Delete account

async function deleteAccountFunc(req, res) {
    try {
         const {password}=req.body;

        // const { email, password } = req.body;
        const token = req.cookies.token;
        // Verify the JWT token to get the email
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
       
        if(decoded){
            const email=decoded.email;
              // Find the user by email
        const user = await userModel.findOne({ email });
       
        if (!user ) {
          //delete the token 
          res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        });
            return res.status(400).send({ st: 400, message: "You nead to login  in first" });
        }
  const check=await bcrypt.compare(password,user.newpassword);

        if( !check){
            return res.status(400).send({ st: 400, message: "Enter the correct password" });
        }


        // Delete the user account
        await userModel.deleteOne({ email });
   //delete the token 
   res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0
});
        res.status(200).send({ st: 200, message: "Account deleted successfully" });
        }
         
      
    } catch (err) {
        console.error(err.message);
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        });
        res.status(500).send({ st: 500, message: "You nead to login  in first" });
    }
}

// Sign out (delete JWT cookie)
async function signOutFunc(req, res) {
    try {

        const { password }=req.body;

        // const { email, password } = req.body;
        const token = req.cookies.token;
        
        // Verify the JWT token to get the email
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
       
        if(decoded){
            const email=decoded.email;
              // Find the user by email
        const user = await userModel.findOne({ email });
       
        if (!user ) {
          //delete the token 
          res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        });
            return res.status(400).send({ st: 400, message: "You nead to login  in first" });
        }
  const check=await bcrypt.compare(password,user.newpassword);

        if( !check){
            return res.status(400).send({ st: 400, message: "Enter the correct password" });
        }
    res.status(200).send({ st: 200, message: "Signed out successfully" });
  }






    } catch (err) {
        
        
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0
        });
 
        
        res.status(500).send({ st: 500, message: "You nead to login  in first" });
    }
}

module.exports = {
    loginFunc,
    registerFunc,
    changePasswordFunc,
    deleteAccountFunc,
    signOutFunc,verifyOTPFunc
};
