const { userModel, otpModel } = require("../models/schema");
const nodemailer = require('nodemailer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Send email function
let bookingId = generateOTP();

async function sendEmail(email, metadata, receiptUrl) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Hostinger SMTP server
        port: 465, // Port for secure connection
        secure: true, // Use SSL
        auth: {
            user: process.env.HOSTINGER_EMAIL_USER, // Your Hostinger email
            pass: process.env.HOSTINGER_EMAIL_PASS // Your Hostinger email password
        }
    });

    const mailOptions = {
        from: process.env.HOSTINGER_EMAIL_USER, // Sender email from Hostinger
        to: email,
        subject: 'Your Booking Confirmation and Receipt',
        text: `
Dear Customer,

Thank you for your payment! We’re pleased to confirm that your booking has been successfully processed. Below are the details of your booking:

---

Booking Details:

-Booking Id:#${bookingId}
- Number of Persons: ${metadata.persons}
- Hand Luggage: ${metadata.handLuggage}
- Checked Luggage: ${metadata.checkedLuggage}
- Flight Number: ${metadata.flightNumber}
- Landing Time: ${new Date(metadata.landingTime).toLocaleString()}
- Driver Note: ${metadata.driverNote}
- Add-Ons: ${metadata.addOns.join(', ')}
- Pickup Location: ${metadata.from}
- Destination: ${metadata.to}
- Pickup Date: ${new Date(metadata.pickupDate).toLocaleDateString()}
- Pickup Time: ${metadata.pickupTime}
- Distance: ${metadata.distance}
- Estimated Travel Time: ${metadata.estimatedTime}
${metadata.bookingForSomeoneElse ? `- Booking for: ${metadata.someoneElseName}` : ''}

---

Receipt link:

You can see the reciept using the following link:

${receiptUrl}

If you have any questions or need further assistance, feel free to contact us.

Thank you for choosing our service!

Best regards,
Comfort Trips
`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Send OTP to user's email
async function sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Hostinger SMTP server
        port: 465, // Port for secure connection
        secure: true, // Use SSL
        auth: {
            user: process.env.HOSTINGER_EMAIL_USER, // Your Hostinger email
            pass: process.env.HOSTINGER_EMAIL_PASS // Your Hostinger email password
        }
    });
    const mailOptions = {
        from: process.env.HOSTINGER_EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`
    };

    await transporter.sendMail(mailOptions);
}
// // Send email function
// let bookingId=generateOTP();
// async function sendEmail(email, metadata, receiptUrl) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail', // or your email service
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     const mailOptions = {
//         from: process.env.EMAIL_USER, // Use the environment variable for sender email
//         to: email,
//         subject: 'Your Booking Confirmation and Receipt',
//         text: `
// Dear Customer,

// Thank you for your payment! We’re pleased to confirm that your booking has been successfully processed. Below are the details of your booking:

// ---

// Booking Details:

// -Booking Id:#${bookingId}
// - Number of Persons: ${metadata.persons}
// - Hand Luggage: ${metadata.handLuggage}
// - Checked Luggage: ${metadata.checkedLuggage}
// - Flight Number: ${metadata.flightNumber}
// - Landing Time: ${new Date(metadata.landingTime).toLocaleString()}
// - Driver Note: ${metadata.driverNote}
// - Add-Ons: ${metadata.addOns.join(', ')}
// - Pickup Location: ${metadata.from}
// - Destination: ${metadata.to}
// - Pickup Date: ${new Date(metadata.pickupDate).toLocaleDateString()}
// - Pickup Time: ${metadata.pickupTime}
// - Distance: ${metadata.distance}
// - Estimated Travel Time: ${metadata.estimatedTime}
// ${metadata.bookingForSomeoneElse ? `- Booking for: ${metadata.someoneElseName}` : ''}

// ---

// Receipt:

// You can view and download your payment receipt using the following link:

// ${receiptUrl}

// If you have any questions or need further assistance, feel free to contact us.

// Thank you for choosing our service!

// Best regards,
// Comfort Trips
// `
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully.');
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }

// // Endpoint to handle payment and send receipt
async function createCheckout(req, res) {
    try {
        // Get the JWT token from cookies
        console.log("Stripe Secret Key: " + process.env.STRIPE_SECRET_KEY);
        const token = req.cookies.token; // Assuming the cookie name is 'token'
        
        // Decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Extract the email from the decoded token
        const email = decoded.email;
        
        // Destructure other data from request body
        const { tokens, amount, finalObject } = req.body;

        // Ensure the amount is an integer
        const amountInPence = Math.round(amount); // Convert to integer

        console.log("Amount in pence: " + amountInPence);
        
        // Create a Stripe charge
        const charge = await stripe.charges.create({
            amount: amountInPence, // Amount in pence
            currency: 'gbp',
            description: 'Booking Payment',
            source: tokens,
        });

        // Check if the charge was successful
        if (charge.status === 'succeeded') {
            // Send an email with the receipt URL
            const receiptUrl = charge.receipt_url;
            await sendEmail(email, finalObject, receiptUrl);
            console.log("Booking for someone else: " + finalObject.bookingForSomeoneElse);
            if (finalObject.bookingForSomeoneElse) {
                await sendEmail(finalObject.someoneElseEmail, finalObject, receiptUrl);
            }
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, error: 'Charge was not successful' });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(400).json({ success: false, error: error.message });
    }
}



async function verifyTokenAtStart(req, res) {
    try {
        // Retrieve the JWT from cookies
        const token = req.cookies.token;

        // If no token is present, return unauthorized response
        if (!token) {
            return res.status(401).send({ st: 401, message: "No token, user not signed in" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If token is valid, send back user information
        if (decoded) {
            const { email, id } = decoded;
            return res.status(200).send({ st: 200, message: "User is signed in", email, id });
        }
    } catch (err) {
        // If token is invalid or any error occurs
        res.status(401).send({ st: 401, message: "Invalid token, user not signed in" });
    }
}


// Generate random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// // Send OTP to user's email
// async function sendOTPEmail(email, otp) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail', // or your email service
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });
//     const mailOptions = {
//         from: 'testazan123@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp},It will be Expired in 10 minutes.`
//     };

//     await transporter.sendMail(mailOptions);
// }

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
        res.status(200).send({ st: 200, jwt: token, message: "Login successful" });
    } catch (err) {
        console.error("message" + err.message);

        res.status(500).send({ st: 500, message: "Invalid email or password" });
    }
}



// Change password
async function changePasswordFunc(req, res) {
    try {
        const { confirmPassword, newPassword, oldPassword } = req.body;
        if (!confirmPassword || !newPassword || !oldPassword) {
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

            const check = await bcrypt.compare(oldPassword, user.newpassword);
            if (!check) {
                return res.status(400).send({ st: 400, message: "Enter the correct old password." });
            }
            // Check if the confirmPassword and newPassword are the same
            if (confirmPassword != newPassword) {

                return res.status(400).send({ st: 400, message: "Both passwords should be same." });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password
            user.newpassword = hashedPassword;
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
        const { password } = req.body;

        // const { email, password } = req.body;
        const token = req.cookies.token;
        // Verify the JWT token to get the email

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (decoded) {
            const email = decoded.email;
            // Find the user by email
            const user = await userModel.findOne({ email });

            if (!user) {
                //delete the token 
                res.cookie('token', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 0
                });
                return res.status(400).send({ st: 400, message: "You nead to login  in first" });
            }
            const check = await bcrypt.compare(password, user.newpassword);

            if (!check) {
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

        const { password } = req.body;

        // const { email, password } = req.body;
        const token = req.cookies.token;

        // Verify the JWT token to get the email
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (decoded) {
            const email = decoded.email;
            // Find the user by email
            const user = await userModel.findOne({ email });

            if (!user) {
                res.cookie('token', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 0,
                    path: '/', // Ensure this matches the original path
                });
                
                return res.status(400).send({ st: 400, message: "You nead to login  in first" });
            }
            const check = await bcrypt.compare(password, user.newpassword);

            if (!check) {
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



// Forgot Password Endpoint
async function forgetPaswordFunc(req, res) {
    try {
        const { email, newPassword } = req.body;

        // Check if email is registered
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ st: 400, message: "Email not registered" });
        }

        // Generate OTP
        const otp = generateOTP();

        // Store OTP temporarily
        await otpModel.create({ email, otp, newpassword: newPassword, newUsername: user.newUsername });

        // Send OTP email
        await sendOTPEmail(email, otp);

        return res.status(200).send({ st: 200, message: "OTP sent to email" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
};


async function resetPasword(req, res) {
    try {
        const { email, otp } = req.body;

        // Find the OTP entry
        const otpEntry = await otpModel.findOne({ email, otp });
        if (!otpEntry) {
            return res.status(400).send({ st: 400, message: "Invalid OTP" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(otpEntry.newpassword, 10);

        // Update the user's password
        await userModel.updateOne({ email }, { newpassword: hashedPassword });

        // Delete OTP entry after successful password reset
        await otpModel.deleteMany({ email });

        return res.status(200).send({ st: 200, message: "Password reset successfully" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ st: 500, message: "Internal server error" });
    }
};


module.exports = {
    loginFunc,
    registerFunc,
    changePasswordFunc,
    deleteAccountFunc,
    signOutFunc, verifyOTPFunc
    , forgetPaswordFunc, resetPasword, verifyTokenAtStart, createCheckout
};
